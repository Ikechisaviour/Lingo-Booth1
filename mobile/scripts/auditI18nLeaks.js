/* eslint-disable no-console */
// Mobile twin of frontend/scripts/auditI18nLeaks.js.
// Walks mobile/src/**/*.{ts,tsx,js,jsx} and flags hardcoded English in JSX
// that should be running through i18n. Same shape as the web audit so the
// reports are interchangeable. See AGENTS.md "Language Support" and
// "Web/Mobile Parity" — every UI string must use t().
//
// Run: node scripts/auditI18nLeaks.js
//      node scripts/auditI18nLeaks.js --json

const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;

const root = path.resolve(__dirname, '..');
const src = path.join(root, 'src');

const ALLOWED_FILES = [
  /src[\\/]locales[\\/]/,
  /src[\\/]i18n\.(ts|tsx|js)$/,
  /src[\\/]index\.(ts|tsx|js)$/,
  /src[\\/]config[\\/]learningModes\.(ts|js)$/,
  /\.test\.[tj]sx?$/,
  /src[\\/]screens[\\/]admin[\\/]/i,
  /src[\\/]services[\\/]errorReporter\.(ts|js)$/,
  /src[\\/]services[\\/]guestActivityTracker\.(ts|js)$/,
];

const I18N_ATTRS = new Set([
  'placeholder',
  'title',
  'accessibilityLabel',
  'accessibilityHint',
  'aria-label',
  'aria-description',
  'alt',
  'label',
]);

const BRAND_STRINGS = new Set([
  'Lingo Booth',
]);

function looksLikeUserVisibleEnglish(value) {
  if (typeof value !== 'string') return false;
  const s = value.trim();
  if (s.length < 3) return false;
  if (BRAND_STRINGS.has(s)) return false;
  if (/^https?:\/\//.test(s)) return false;
  if (/^[/\\.][a-zA-Z]/.test(s)) return false;
  if (/^[a-z][a-z0-9_-]*$/.test(s)) return false;
  if (/^[A-Z_]{2,}$/.test(s)) return false;
  if (/^[0-9.+\-*/=%px#]+$/.test(s)) return false;
  if (/^[\d\s.,:/-]+$/.test(s)) return false;
  if (/^#[0-9a-fA-F]{3,8}$/.test(s)) return false;
  if (/^[A-Z][A-Za-z]+[A-Z][A-Za-z]+$/.test(s) && !s.includes(' ')) return false;
  if (/^\{[^{}]*\}$/.test(s)) return false;
  if (/^[\s\p{Emoji_Presentation}\p{Extended_Pictographic}]+$/u.test(s)) return false;

  const letterRuns = s.match(/[A-Za-z]+/g) || [];
  const totalLetters = letterRuns.reduce((sum, run) => sum + run.length, 0);
  if (totalLetters < 3) return false;
  const nonLatin = (s.match(/[Ѐ-鿿가-힯؀-ۿऀ-ॿ֐-׿฀-๿ঀ-৿஀-௿]/g) || []).length;
  if (nonLatin > totalLetters) return false;
  const longRun = letterRuns.some((run) => run.length >= 4);
  if (!s.includes(' ') && !longRun) return false;
  return true;
}

const sourceExts = new Set(['.ts', '.tsx', '.js', '.jsx']);

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (['node_modules', 'build', '.git', 'scripts', '.expo', 'ios', 'android'].includes(entry.name)) return [];
      return walk(full);
    }
    return sourceExts.has(path.extname(entry.name)) ? [full] : [];
  });
}

function isAllowedFile(file) {
  const rel = path.relative(root, file);
  return ALLOWED_FILES.some((pat) => pat.test(rel));
}

function isInsideTCall(p) {
  let current = p.parentPath;
  while (current) {
    const node = current.node;
    if (node?.type === 'CallExpression') {
      const callee = node.callee;
      if (callee?.type === 'Identifier' && callee.name === 't') return true;
      if (callee?.type === 'MemberExpression' && callee.property?.name === 't') return true;
    }
    current = current.parentPath;
  }
  return false;
}

function isInsideTransComponent(p) {
  let current = p.parentPath;
  while (current) {
    const node = current.node;
    if (node?.type === 'JSXElement') {
      const tagName = node.openingElement?.name;
      const name = tagName?.type === 'JSXIdentifier' ? tagName.name : '';
      if (name === 'Trans' || name === 'Translate') return true;
    }
    current = current.parentPath;
  }
  return false;
}

function analyzeFile(file) {
  const source = fs.readFileSync(file, 'utf8');
  let ast;
  try {
    ast = parser.parse(source, {
      sourceType: 'module',
      plugins: ['jsx', 'typescript'],
      errorRecovery: true,
    });
  } catch (err) {
    return [{ file, line: 0, kind: 'parse-error', text: err.message }];
  }

  const findings = [];

  traverse(ast, {
    JSXText(p) {
      const value = p.node.value;
      if (!looksLikeUserVisibleEnglish(value)) return;
      if (isInsideTransComponent(p)) return;
      findings.push({ file, line: p.node.loc?.start?.line || 0, kind: 'jsx-text', text: value.trim() });
    },

    JSXAttribute(p) {
      const attrName = p.node.name?.name;
      if (!attrName || !I18N_ATTRS.has(attrName)) return;
      const valueNode = p.node.value;
      if (valueNode?.type !== 'StringLiteral') return;
      const value = valueNode.value;
      if (!looksLikeUserVisibleEnglish(value)) return;
      findings.push({ file, line: p.node.loc?.start?.line || 0, kind: `jsx-attr:${attrName}`, text: value });
    },

    StringLiteral(p) {
      const parent = p.parentPath?.node;
      if (parent?.type !== 'JSXExpressionContainer') return;
      const value = p.node.value;
      if (!looksLikeUserVisibleEnglish(value)) return;
      if (isInsideTCall(p)) return;
      if (isInsideTransComponent(p)) return;
      findings.push({ file, line: p.node.loc?.start?.line || 0, kind: 'jsx-expr-string', text: value });
    },
  });

  return findings;
}

function main() {
  const wantJson = process.argv.includes('--json');
  const files = walk(src).filter((f) => !isAllowedFile(f));
  const allFindings = [];
  for (const file of files) allFindings.push(...analyzeFile(file));

  if (wantJson) {
    console.log(JSON.stringify(allFindings, null, 2));
    process.exit(allFindings.length > 0 ? 1 : 0);
  }

  if (allFindings.length === 0) {
    console.log('Mobile i18n leak audit passed — no hardcoded English in JSX.');
    process.exit(0);
  }

  const byFile = new Map();
  for (const f of allFindings) {
    const list = byFile.get(f.file) || [];
    list.push(f);
    byFile.set(f.file, list);
  }

  console.error(`Mobile i18n leak audit found ${allFindings.length} hardcoded English string(s) in ${byFile.size} file(s):\n`);
  for (const [file, list] of byFile) {
    console.error(path.relative(root, file));
    for (const item of list) {
      const snippet = item.text.length > 80 ? `${item.text.slice(0, 77)}…` : item.text;
      console.error(`  ${item.line.toString().padStart(4, ' ')}  [${item.kind}]  ${JSON.stringify(snippet)}`);
    }
    console.error('');
  }
  process.exit(1);
}

main();
