/* eslint-disable no-console */
// Audit: hardcoded English in JSX / JS that should be running through i18n.
//
// Why this exists: the existing auditLocaleKeys.js catches keys that are
// missing from non-English locale files. It does NOT catch JSX that never
// used `t()` in the first place — strings hardcoded inline like
// `<Text>Mark complete</Text>` or `placeholder="Ask a question…"`. Those
// leak straight through to non-English learners as visible English text.
//
// This script walks every .js/.jsx file under src/, parses the JSX, and
// flags hardcoded English in:
//   - JSXText (visible text between opening and closing tags)
//   - JSXAttribute string literals on i18n-relevant props (placeholder,
//     title, aria-label, alt, label).
//
// It deliberately allows:
//   - strings already inside a t(...) call
//   - strings inside <Trans> / <Translate> components
//   - files in src/locales/** (those ARE the translation tables)
//   - target-language samples written in non-Latin script
//   - strings that look like CSS classes, file paths, URLs, emojis, env vars
//   - files explicitly whitelisted (marketing/landing copy tables)
//
// Run: node scripts/auditI18nLeaks.js
//      node scripts/auditI18nLeaks.js --json   (machine-readable output)

const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;

const root = path.resolve(__dirname, '..');
const src = path.join(root, 'src');

// Files that are inherently i18n source-of-truth or contain authored copy
// that's intentionally English (developer-facing strings, code, etc.).
// Admin pages are excluded by the same precedent that auditGuardrails.js
// uses for the "AI" wording check — the admin is a single dev-facing user.
const ALLOWED_FILES = [
  /src[\\/]locales[\\/]/,                       // translation tables
  /src[\\/]i18n\.js$/,                           // i18n setup
  /src[\\/]index\.js$/,                          // bootstrap
  /src[\\/]index\.css$/,
  /src[\\/]App\.css$/,
  /src[\\/]reportWebVitals\.js$/,
  /src[\\/]setupTests\.js$/,
  /src[\\/]services[\\/]errorReporter\.js$/,    // dev-only logging
  /src[\\/]services[\\/]guestActivityTracker\.js$/,
  /\.test\.jsx?$/,                              // test files
  /src[\\/]config[\\/]learningModes\.js$/,      // mode definitions
  /src[\\/]pages[\\/]Admin/i,                   // admin UI is dev-facing
  /src[\\/]pages[\\/]AdminSpeakingDemo/i,
];

// Attribute names that, if set to a string literal, are user-visible and
// should be wrapped in t(). Other attributes (className, role, name, id,
// data-*, etc.) are allowed because they're not displayed to the user.
const I18N_ATTRS = new Set([
  'placeholder',
  'title',
  'aria-label',
  'aria-description',
  'alt',
  'label',
]);

// Heuristic: a string is "English-leaky" if it contains letters and is
// long enough to plausibly be visible UI copy. We deliberately ignore
// short tokens (e.g. "ok", "/", "&") and strings that look like values
// rather than copy.
// Strings that look like UI English but are intentionally untranslated —
// product name, brand identifiers, etc. Always exact-match.
const BRAND_STRINGS = new Set([
  'Lingo Booth',
]);

function looksLikeUserVisibleEnglish(value) {
  if (typeof value !== 'string') return false;
  const s = value.trim();
  if (s.length < 3) return false;
  if (BRAND_STRINGS.has(s)) return false;

  // Skip URLs, paths, env-style tokens, kebab/snake-case identifiers,
  // package names, regex-ish content, CSS-y values, single tokens.
  if (/^https?:\/\//.test(s)) return false;
  if (/^[/\\.][a-zA-Z]/.test(s)) return false;
  if (/^[a-z][a-z0-9_-]*$/.test(s)) return false;    // single-token: "submit", "close" — too short to be a sentence
  if (/^[A-Z_]{2,}$/.test(s)) return false;          // SCREAMING_CASE constants
  if (/^[0-9.+\-*/=%px#]+$/.test(s)) return false;   // numbers / units
  if (/^[\d\s.,:/-]+$/.test(s)) return false;        // dates, numeric labels
  if (/^#[0-9a-fA-F]{3,8}$/.test(s)) return false;   // hex colors
  if (/^[A-Z][A-Za-z]+[A-Z][A-Za-z]+$/.test(s) && !s.includes(' ')) return false; // CamelCaseIdentifier
  if (/^\{[^{}]*\}$/.test(s)) return false;          // template-like placeholder
  if (/^[\s\p{Emoji_Presentation}\p{Extended_Pictographic}]+$/u.test(s)) return false; // emoji-only

  // Must contain at least one ASCII letter sequence to plausibly be English.
  const letterRuns = s.match(/[A-Za-z]+/g) || [];
  const totalLetters = letterRuns.reduce((sum, run) => sum + run.length, 0);
  if (totalLetters < 3) return false;

  // Allow if string is dominated by non-Latin script (Korean, Arabic, Hindi
  // etc.) — that's a target-language learning sample.
  const nonLatin = (s.match(/[Ѐ-鿿가-힯؀-ۿऀ-ॿ֐-׿฀-๿ঀ-৿஀-௿]/g) || []).length;
  if (nonLatin > totalLetters) return false;

  // Require at least one space OR a letter run of 4+ chars — filters out
  // short tokens like "Ok", "Yes" that may be valid UI without i18n.
  const longRun = letterRuns.some((run) => run.length >= 4);
  if (!s.includes(' ') && !longRun) return false;

  return true;
}

const textExtensions = new Set(['.js', '.jsx']);

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (['node_modules', 'build', '.git', 'scripts'].includes(entry.name)) return [];
      return walk(full);
    }
    return textExtensions.has(path.extname(entry.name)) ? [full] : [];
  });
}

function isAllowedFile(file) {
  const rel = path.relative(root, file);
  return ALLOWED_FILES.some((pat) => pat.test(rel));
}

function isInsideTCall(path) {
  // Walk up the AST. If any ancestor is a CallExpression whose callee is
  // an identifier `t` (or `i18n.t`), the string is going through i18n.
  let current = path.parentPath;
  while (current) {
    const node = current.node;
    if (node?.type === 'CallExpression') {
      const callee = node.callee;
      if (callee?.type === 'Identifier' && callee.name === 't') return true;
      if (
        callee?.type === 'MemberExpression'
        && callee.property?.name === 't'
      ) return true;
    }
    current = current.parentPath;
  }
  return false;
}

function isInsideTransComponent(path) {
  let current = path.parentPath;
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
      plugins: ['jsx'],
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
      findings.push({
        file,
        line: p.node.loc?.start?.line || 0,
        kind: 'jsx-text',
        text: value.trim(),
      });
    },

    JSXAttribute(p) {
      const attrName = p.node.name?.name;
      if (!attrName || !I18N_ATTRS.has(attrName)) return;
      const valueNode = p.node.value;
      if (valueNode?.type !== 'StringLiteral') return;
      const value = valueNode.value;
      if (!looksLikeUserVisibleEnglish(value)) return;
      findings.push({
        file,
        line: p.node.loc?.start?.line || 0,
        kind: `jsx-attr:${attrName}`,
        text: value,
      });
    },

    // String literals inside JSXExpressionContainer that aren't t() calls
    // are a separate class of leak: `<div>{'Hard-coded text'}</div>`. Catch
    // those too.
    StringLiteral(p) {
      const parent = p.parentPath?.node;
      if (parent?.type !== 'JSXExpressionContainer') return;
      const value = p.node.value;
      if (!looksLikeUserVisibleEnglish(value)) return;
      if (isInsideTCall(p)) return;
      if (isInsideTransComponent(p)) return;
      findings.push({
        file,
        line: p.node.loc?.start?.line || 0,
        kind: 'jsx-expr-string',
        text: value,
      });
    },
  });

  return findings;
}

function main() {
  const wantJson = process.argv.includes('--json');
  const files = walk(src).filter((f) => !isAllowedFile(f));
  const allFindings = [];

  for (const file of files) {
    const findings = analyzeFile(file);
    allFindings.push(...findings);
  }

  if (wantJson) {
    console.log(JSON.stringify(allFindings, null, 2));
    process.exit(allFindings.length > 0 ? 1 : 0);
  }

  if (allFindings.length === 0) {
    console.log('i18n leak audit passed — no hardcoded English in JSX.');
    process.exit(0);
  }

  // Group by file for readable output.
  const byFile = new Map();
  for (const f of allFindings) {
    const list = byFile.get(f.file) || [];
    list.push(f);
    byFile.set(f.file, list);
  }

  console.error(`i18n leak audit found ${allFindings.length} hardcoded English string(s) in ${byFile.size} file(s):\n`);
  for (const [file, list] of byFile) {
    console.error(path.relative(root, file));
    for (const item of list) {
      const snippet = item.text.length > 80 ? `${item.text.slice(0, 77)}…` : item.text;
      console.error(`  ${item.line.toString().padStart(4, ' ')}  [${item.kind}]  ${JSON.stringify(snippet)}`);
    }
    console.error('');
  }
  console.error('Wrap each string in t("namespace.key") and add the key to src/locales/en/translation.json.');
  console.error('Then run: node scripts/translateLocaleKeys.js  (fills the other 19 locales).');
  process.exit(1);
}

main();
