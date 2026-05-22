const { spawn } = require('child_process');
const crypto = require('crypto');
const fs = require('fs');
const http = require('http');
const https = require('https');
const os = require('os');
const path = require('path');

const DEFAULT_LOCAL_FRONTEND_URL = 'http://localhost:3000';
const DEFAULT_PRODUCTION_FRONTEND_URL = 'https://lingobooth.com';

const chromeCandidates = [
  process.env.CHROME_PATH,
  process.env.PUPPETEER_EXECUTABLE_PATH,
  process.env.GOOGLE_CHROME_BIN,
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  '/usr/bin/google-chrome',
  '/usr/bin/google-chrome-stable',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
  '/snap/bin/chromium',
  'google-chrome',
  'google-chrome-stable',
  'chromium',
  'chromium-browser',
  'chrome',
  'msedge',
];

function unique(values) {
  return Array.from(new Set(values.filter(Boolean)));
}

function frontendOrigins() {
  return unique([
    process.env.CERTIFICATE_RENDER_URL,
    process.env.PUBLIC_APP_URL,
    process.env.FRONTEND_ORIGIN,
    process.env.FRONTEND_URL,
    process.env.CLIENT_URL,
    process.env.APP_URL,
    DEFAULT_LOCAL_FRONTEND_URL,
    DEFAULT_PRODUCTION_FRONTEND_URL,
  ]).map((value) => value.replace(/\/+$/, ''));
}

function findChromeExecutable() {
  for (const candidate of chromeCandidates) {
    if (!candidate) continue;
    if (!candidate.includes('\\') && !candidate.includes('/')) return candidate;
    if (fs.existsSync(candidate)) return candidate;
  }
  return null;
}

function certificateRenderUrl({ origin, certificateId, certificateLanguage }) {
  const url = new URL('/', origin);
  url.searchParams.set('certificateRender', '1');
  url.searchParams.set('certificateId', certificateId);
  url.searchParams.set('certLang', certificateLanguage || 'en');
  url.searchParams.set('pdf', '1');
  return url.toString();
}

function preflightCertificatePage(url) {
  return new Promise((resolve) => {
    const parsed = new URL(url);
    const client = parsed.protocol === 'https:' ? https : http;
    const request = client.get(url, { timeout: 5000 }, (response) => {
      const ok = response.statusCode >= 200 && response.statusCode < 400;
      response.resume();
      resolve(ok);
    });
    request.on('timeout', () => {
      request.destroy();
      resolve(false);
    });
    request.on('error', () => resolve(false));
  });
}

async function findReachableCertificateUrl({ certificateId, certificateLanguage }) {
  const tried = [];
  for (const origin of frontendOrigins()) {
    const url = certificateRenderUrl({ origin, certificateId, certificateLanguage });
    tried.push(url);
    // Headless Chrome will happily print its own network-error page. Preflight prevents that.
    if (await preflightCertificatePage(url)) return url;
  }

  const error = new Error(`Certificate page is not reachable. Tried: ${tried.join(', ')}`);
  error.statusCode = 503;
  throw error;
}

function runChromePrint({ executable, url, pdfPath, userDataDir }) {
  const args = [
    '--headless=new',
    '--disable-background-networking',
    '--disable-default-apps',
    '--disable-dev-shm-usage',
    '--disable-extensions',
    '--disable-gpu',
    '--disable-sync',
    '--hide-scrollbars',
    '--no-first-run',
    '--no-sandbox',
    '--print-to-pdf-no-header',
    `--print-to-pdf=${pdfPath}`,
    `--user-data-dir=${userDataDir}`,
    '--virtual-time-budget=12000',
    url,
  ];

  return new Promise((resolve, reject) => {
    let stderr = '';
    const child = spawn(executable, args, { windowsHide: true });
    child.stderr.on('data', (chunk) => {
      stderr += chunk.toString();
    });
    child.on('error', reject);
    child.on('close', (code) => {
      if (code === 0) {
        resolve();
        return;
      }
      reject(new Error(stderr.trim() || `Headless browser exited with code ${code}`));
    });
  });
}

async function cleanupPath(targetPath) {
  if (!targetPath) return;
  await fs.promises.rm(targetPath, { recursive: true, force: true }).catch(() => {});
}

async function renderCertificatePdf({ certificateId, certificateLanguage }) {
  const executable = findChromeExecutable();
  if (!executable) {
    const error = new Error('Certificate PDF rendering requires Chrome or Edge on the server');
    error.statusCode = 503;
    throw error;
  }

  const token = crypto.randomBytes(8).toString('hex');
  const workDir = path.join(os.tmpdir(), `lingo-cert-${token}`);
  const userDataDir = path.join(workDir, 'profile');
  const pdfPath = path.join(workDir, 'certificate.pdf');

  await fs.promises.mkdir(userDataDir, { recursive: true });

  try {
    const url = await findReachableCertificateUrl({ certificateId, certificateLanguage });
    await runChromePrint({
      executable,
      url,
      pdfPath,
      userDataDir,
    });
    const pdf = await fs.promises.readFile(pdfPath);
    if (!pdf.length) {
      throw new Error('The certificate PDF renderer produced an empty file');
    }
    return pdf;
  } finally {
    await cleanupPath(workDir);
  }
}

module.exports = {
  renderCertificatePdf,
};
