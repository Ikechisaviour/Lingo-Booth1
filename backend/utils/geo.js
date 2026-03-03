/**
 * geo.js — lightweight IP-to-location helper
 * Uses geoip-lite (offline MaxMind DB, no API key needed).
 * Gracefully falls back to 'Unknown' if the package is not installed.
 */

let geoip = null;
try { geoip = require('geoip-lite'); } catch (_) {}

function getClientIp(req) {
  const forwarded = req.headers['x-forwarded-for'];
  if (forwarded) return forwarded.split(',')[0].trim();
  return req.socket?.remoteAddress || '';
}

function getGeoInfo(ip) {
  if (!geoip) return { country: 'Unknown', countryCode: '', city: '' };
  const clean = ip.replace(/^::ffff:/, '');
  const geo = geoip.lookup(clean);
  return {
    country: geo?.country || 'Unknown',
    countryCode: geo?.country || '',
    city: geo?.city || '',
  };
}

module.exports = { getClientIp, getGeoInfo };
