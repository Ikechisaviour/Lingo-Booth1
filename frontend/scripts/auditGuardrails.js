const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const src = path.join(root, 'src');

const allowedRawColorFiles = new Set([
  path.normalize('src/index.css'),
  path.normalize('src/pages/Auth.css'),
  path.normalize('src/pages/LandingPage.css'),
  path.normalize('src/config/learningModes.js'),
]);

const allowedAiFiles = [
  /src[\\/]services[\\/]api\.js$/,
  /src[\\/]services[\\/]errorReporter\.js$/,
  /src[\\/]pages[\\/]Admin/i,
  /src[\\/]utils[\\/]conversationSpeech\.js$/,
  /src[\\/]locales[\\/]/,
];

const textExtensions = new Set(['.js', '.jsx', '.css', '.json']);

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (['node_modules', 'build', '.git'].includes(entry.name)) return [];
      return walk(full);
    }
    return textExtensions.has(path.extname(entry.name)) ? [full] : [];
  });
}

function rel(file) {
  return path.relative(root, file);
}

function lineNumber(content, index) {
  return content.slice(0, index).split(/\r?\n/).length;
}

function isAllowedAiFile(file) {
  const relative = rel(file);
  return allowedAiFiles.some((pattern) => pattern.test(relative));
}

const issues = [];
const files = walk(src);

for (const file of files) {
  const relative = rel(file);
  const normalized = path.normalize(relative);
  const content = fs.readFileSync(file, 'utf8');

  if (!isAllowedAiFile(file)) {
    const aiPattern = /(['"`>])[^'"`<>{}\n]*(?:\bAI\b|Artificial Intelligence|DeepSeek|OpenAI)[^'"`<>{}\n]*(['"`<])/g;
    let match;
    while ((match = aiPattern.exec(content))) {
      issues.push({
        rule: 'visible-ai-wording',
        file: relative,
        line: lineNumber(content, match.index),
        message: 'Possible user-facing AI/API wording. Use tutor, practice partner, conversation, or guided lesson.',
      });
    }
  }

  if (!allowedRawColorFiles.has(normalized) && path.extname(file) === '.css') {
    const modeColorPattern = /#(?:58cc02|46a302|3d8a02|7ed957|ff6b35|e55a2b|c94920|ff8c5a)\b/gi;
    let match;
    while ((match = modeColorPattern.exec(content))) {
      issues.push({
        rule: 'mode-color-token',
        file: relative,
        line: lineNumber(content, match.index),
        message: `Raw mode color ${match[0]} found. Use mode-aware CSS variables instead.`,
      });
    }
  }

  if (/\.(js|jsx)$/.test(file)) {
    const forbiddenPairPattern = /(nativeLanguage|targetLanguage|getNativeLangCode\(\)|getTargetLangCode\(\))\s*={2,3}\s*['"`](en|ko)['"`]/g;
    let match;
    while ((match = forbiddenPairPattern.exec(content))) {
      if (relative.includes('languagePairPolicy') || relative.includes('publicLanguage') || relative.includes('LandingPage')) continue;
      issues.push({
        rule: 'language-pair-branching',
        file: relative,
        line: lineNumber(content, match.index),
        message: 'Direct English/Korean branching found. Use shared language-pair policy unless this is documented content.',
      });
    }
  }
}

const requiredFiles = [
  'AGENTS.md',
  'docs/IMPLEMENTATION_GUARDRAILS.md',
  'frontend/src/utils/languagePairPolicy.js',
  'frontend/src/config/learningModes.js',
];

for (const required of requiredFiles) {
  if (!fs.existsSync(path.resolve(root, '..', required))) {
    issues.push({
      rule: 'required-guardrail-file',
      file: required,
      line: 1,
      message: 'Required guardrail file is missing.',
    });
  }
}

if (issues.length > 0) {
  console.error(`Guardrail audit failed with ${issues.length} issue(s):`);
  for (const issue of issues) {
    console.error(`- [${issue.rule}] ${issue.file}:${issue.line} ${issue.message}`);
  }
  process.exit(1);
}

console.log('Guardrail audit passed.');
