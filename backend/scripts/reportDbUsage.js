/* eslint-disable no-console */
// One-shot: connect using MONGODB_URI from .env and print a usage report.
// Atlas free tier (M0) caps you at 512 MB of storage, so the numbers that
// matter are `Storage size` (compressed on disk) and `Total index size`.
//
// Usage:   node scripts/reportDbUsage.js
require('dotenv').config();
const mongoose = require('mongoose');

const MB = 1024 * 1024;
const fmt = (bytes) => `${(bytes / MB).toFixed(2)} MB`;

async function main() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('MONGODB_URI is not set in backend/.env');
    process.exit(1);
  }

  await mongoose.connect(uri, { family: 4 });
  const db = mongoose.connection.db;
  const dbName = db.databaseName;

  console.log(`\nDatabase: ${dbName}`);
  console.log('='.repeat(60));

  const stats = await db.stats({ scale: 1 });
  // Atlas free tier counts `storageSize` against your 512 MB quota.
  const totalUsage = (stats.storageSize || 0) + (stats.indexSize || 0);
  console.log(`Collections        : ${stats.collections}`);
  console.log(`Documents          : ${stats.objects?.toLocaleString?.() || stats.objects}`);
  console.log(`Data size (uncompr): ${fmt(stats.dataSize)}`);
  console.log(`Storage size (disk): ${fmt(stats.storageSize)}`);
  console.log(`Indexes            : ${stats.indexes} (${fmt(stats.indexSize)})`);
  console.log(`Total on-disk      : ${fmt(totalUsage)}`);
  if (stats.fsTotalSize) {
    console.log(`Cluster volume     : ${fmt(stats.fsUsedSize)} used of ${fmt(stats.fsTotalSize)}`);
  }

  console.log('\nPer-collection breakdown:');
  console.log('-'.repeat(60));
  const collections = await db.listCollections().toArray();
  const rows = [];
  for (const { name } of collections) {
    try {
      const cStats = await db.command({ collStats: name, scale: 1 });
      rows.push({
        name,
        count: cStats.count || 0,
        storage: cStats.storageSize || 0,
        index: cStats.totalIndexSize || 0,
        total: (cStats.storageSize || 0) + (cStats.totalIndexSize || 0),
      });
    } catch (err) {
      console.warn(`  (${name}) — collStats failed: ${err.message}`);
    }
  }
  rows.sort((a, b) => b.total - a.total);

  const colName = (s) => s.padEnd(28);
  console.log(`${colName('Collection')}${'Docs'.padStart(10)}${'Storage'.padStart(12)}${'Indexes'.padStart(12)}${'Total'.padStart(12)}`);
  for (const r of rows) {
    console.log(
      `${colName(r.name)}${String(r.count).padStart(10)}${fmt(r.storage).padStart(12)}${fmt(r.index).padStart(12)}${fmt(r.total).padStart(12)}`,
    );
  }

  // Free-tier headroom hint — only meaningful if the URI is an Atlas SRV.
  if (/mongodb\+srv:\/\//.test(uri)) {
    const FREE_TIER_MB = 512;
    const usedMB = totalUsage / MB;
    const percent = ((usedMB / FREE_TIER_MB) * 100).toFixed(1);
    console.log('\nAtlas free-tier (M0) reference:');
    console.log(`  Used  ${fmt(totalUsage)} of 512 MB  (${percent}%)`);
    console.log('  Note: if your cluster is M2/M10/dedicated, ignore the 512 MB cap.');
    console.log('  Authoritative numbers live in the Atlas UI under Metrics > Disk Usage.');
  }

  await mongoose.disconnect();
}

main().catch((err) => {
  console.error('Report failed:', err.message || err);
  process.exit(1);
});
