/* eslint-disable no-console */
// Mobile twin of frontend/scripts/harvestI18nDefaults.js.
// Scans mobile/src/**/*.{ts,tsx,js,jsx} for t('key', 'English default') calls
// and writes the (key → default) pairs into mobile/src/locales/en/translation.json.
// See frontend script for the rationale.

const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;

const root = path.resolve(__dirname, '..');
const src = path.join(root, 'src');
const enFile = path.join(src, 'locales', 'en', 'translation.json');

const exts = new Set(['.ts', '.tsx', '.js', '.jsx']);

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (['node_modules', 'build', '.git', 'scripts', 'locales', '.expo', 'ios', 'android'].includes(entry.name)) return [];
      return walk(full);
    }
    return exts.has(path.extname(entry.name)) ? [full] : [];
  });
}

function harvest(file) {
  const source = fs.readFileSync(file, 'utf8');
  let ast;
  try {
    ast = parser.parse(source, {
      sourceType: 'module',
      plugins: ['jsx', 'typescript'],
      errorRecovery: true,
    });
  } catch (_) {
    return [];
  }

  const found = [];
  traverse(ast, {
    CallExpression(p) {
      const callee = p.node.callee;
      const isT = (callee?.type === 'Identifier' && callee.name === 't')
        || (callee?.type === 'MemberExpression' && callee.property?.name === 't');
      if (!isT) return;

      const args = p.node.arguments || [];
      if (args.length < 2) return;
      const key = args[0];
      if (key?.type !== 'StringLiteral') return;

      const second = args[1];
      let defaultValue = null;
      if (second?.type === 'StringLiteral') {
        defaultValue = second.value;
      } else if (second?.type === 'ObjectExpression') {
        const dv = second.properties.find((prop) => (
          prop.type === 'ObjectProperty'
          && (prop.key?.name === 'defaultValue' || prop.key?.value === 'defaultValue')
        ));
        if (dv?.value?.type === 'StringLiteral') defaultValue = dv.value.value;
      }
      if (defaultValue == null) return;

      found.push({ key: key.value, defaultValue });
    },
  });
  return found;
}

function setByPath(obj, pathArr, value) {
  let current = obj;
  for (let i = 0; i < pathArr.length - 1; i++) {
    const k = pathArr[i];
    if (!current[k] || typeof current[k] !== 'object' || Array.isArray(current[k])) {
      current[k] = {};
    }
    current = current[k];
  }
  if (current[pathArr[pathArr.length - 1]] === undefined) {
    current[pathArr[pathArr.length - 1]] = value;
    return true;
  }
  return false;
}

function main() {
  const files = walk(src);
  const harvested = [];
  for (const file of files) harvested.push(...harvest(file));

  const seen = new Map();
  for (const { key, defaultValue } of harvested) {
    if (!seen.has(key)) seen.set(key, defaultValue);
  }

  const en = JSON.parse(fs.readFileSync(enFile, 'utf8'));
  let added = 0;
  for (const [key, value] of seen) {
    if (setByPath(en, key.split('.'), value)) added += 1;
  }

  fs.writeFileSync(enFile, JSON.stringify(en, null, 2) + '\n');
  console.log(`Mobile: harvested ${seen.size} t() calls with defaults; added ${added} new keys to en/translation.json.`);
}

main();
