/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const repoRoot = path.resolve(root, '..');

function read(rel) {
  return fs.readFileSync(path.join(repoRoot, rel), 'utf8');
}

function fail(message) {
  console.error(`Billing localization audit failed: ${message}`);
  process.exitCode = 1;
}

function flattenKeys(obj, prefix = '') {
  return Object.entries(obj || {}).flatMap(([key, value]) => {
    const next = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      return flattenKeys(value, next);
    }
    return [next];
  });
}

const LATIN_PLAN_NAMES = {
  free: 'Free',
  plus: 'Plus',
  pro: 'Pro',
  ultra: 'Ultra',
  institution_basic: 'Institution Basic',
  institution_pro: 'Institution Pro',
  institution_enterprise: 'Institution Enterprise',
};

const SOUND_PLAN_NAMES_BY_LOCALE = {
  ar: {
    free: 'فري',
    plus: 'بلس',
    pro: 'برو',
    ultra: 'ألترا',
    institution_basic: 'إنستيتيوشن بيسك',
    institution_pro: 'إنستيتيوشن برو',
    institution_enterprise: 'إنستيتيوشن إنتربرايز',
  },
  bn: {
    free: 'ফ্রি',
    plus: 'প্লাস',
    pro: 'প্রো',
    ultra: 'আল্ট্রা',
    institution_basic: 'ইনস্টিটিউশন বেসিক',
    institution_pro: 'ইনস্টিটিউশন প্রো',
    institution_enterprise: 'ইনস্টিটিউশন এন্টারপ্রাইজ',
  },
  he: {
    free: 'פרי',
    plus: 'פלוס',
    pro: 'פרו',
    ultra: 'אולטרה',
    institution_basic: 'אינסטיטיושן בייסיק',
    institution_pro: 'אינסטיטיושן פרו',
    institution_enterprise: 'אינסטיטיושן אנטרפרייז',
  },
  hi: {
    free: 'फ्री',
    plus: 'प्लस',
    pro: 'प्रो',
    ultra: 'अल्ट्रा',
    institution_basic: 'इंस्टिट्यूशन बेसिक',
    institution_pro: 'इंस्टिट्यूशन प्रो',
    institution_enterprise: 'इंस्टिट्यूशन एंटरप्राइज',
  },
  ja: {
    free: 'フリー',
    plus: 'プラス',
    pro: 'プロ',
    ultra: 'ウルトラ',
    institution_basic: 'インスティテューション ベーシック',
    institution_pro: 'インスティテューション プロ',
    institution_enterprise: 'インスティテューション エンタープライズ',
  },
  ko: {
    free: '프리',
    plus: '플러스',
    pro: '프로',
    ultra: '울트라',
    institution_basic: '인스티튜션 베이식',
    institution_pro: '인스티튜션 프로',
    institution_enterprise: '인스티튜션 엔터프라이즈',
  },
  ru: {
    free: 'Фри',
    plus: 'Плюс',
    pro: 'Про',
    ultra: 'Ультра',
    institution_basic: 'Инститьюшн Бейсик',
    institution_pro: 'Инститьюшн Про',
    institution_enterprise: 'Инститьюшн Энтерпрайз',
  },
  ta: {
    free: 'ஃப்ரீ',
    plus: 'பிளஸ்',
    pro: 'ப்ரோ',
    ultra: 'அல்ட்ரா',
    institution_basic: 'இன்ஸ்டிட்யூஷன் பேசிக்',
    institution_pro: 'இன்ஸ்டிட்யூஷன் ப்ரோ',
    institution_enterprise: 'இன்ஸ்டிட்யூஷன் என்டர்பிரைஸ்',
  },
};

function assertSoundPlanNames(locale, data, surface) {
  const expected = SOUND_PLAN_NAMES_BY_LOCALE[locale] || LATIN_PLAN_NAMES;
  for (const [planId, expectedName] of Object.entries(expected)) {
    const actual = data.pricing?.planNames?.[planId];
    if (actual !== expectedName) {
      fail(`${surface} ${locale} pricing.planNames.${planId} must be sound-based "${expectedName}", not "${actual}".`);
    }
  }
}

const adminSource = read('frontend/src/pages/AdminDashboard.js');
const billingStart = adminSource.indexOf("{activeTab === 'billing'");
const billingEnd = adminSource.indexOf("{activeTab === 'flashcards'");
if (billingStart === -1 || billingEnd === -1 || billingEnd <= billingStart) {
  fail('could not locate the AdminDashboard billing section.');
} else {
  const billingSection = adminSource.slice(billingStart, billingEnd);
  const forbiddenBillingCopy = [
    'Discounts',
    'Apply method',
    'Customer enters a code',
    'Automatic for eligible users',
    'Optional internal label',
    'This discount is applied during checkout',
    'Percent off',
    'Amount off',
    'Limit to plans',
    'Usage limit',
    'Create automatic discount',
    'Create discount code',
    'Active and recent discounts',
    'No discounts yet.',
    'Automatic discount',
    'no code needed',
    'code required',
    'Applied automatically',
    'All plans',
    'Assign individual access',
    'User email or id',
    'Ends at',
    'Update access',
    'Create institution',
    'Organization name',
    'Billing email',
    'Institution requests',
    'No open institution requests.',
    'Recent subscriptions',
    'No subscription records yet.',
    'Organizations',
    'No organizations yet.',
  ];

  for (const text of forbiddenBillingCopy) {
    const appearsAsVisibleLiteral =
      billingSection.includes(`>${text}<`)
      || billingSection.includes(`'${text}'`)
      || billingSection.includes(`"${text}"`);
    if (appearsAsVisibleLiteral) {
      fail(`AdminDashboard billing section contains hardcoded copy: "${text}". Use adminBilling/pricing/billing locale keys.`);
    }
  }

  if (!billingSection.includes("t('adminBilling.")) {
    fail('AdminDashboard billing section is not using adminBilling locale keys.');
  }
}

const institutionSource = read('frontend/src/pages/InstitutionDashboard.js');
if (/toLocaleDateString\(\s*\)/.test(institutionSource)) {
  fail('InstitutionDashboard has date formatting without the active i18n locale.');
}

const billingPageSource = read('frontend/src/pages/BillingPage.js');
if (/toLocaleDateString\(\s*\)/.test(billingPageSource)) {
  fail('BillingPage has date formatting without the active i18n locale.');
}
if (!billingPageSource.includes("t(`pricing.planNames.")) {
  fail('BillingPage subscription plan names must use pricing.planNames locale keys.');
}

const mobileBillingSource = read('mobile/src/screens/billing/BillingScreen.tsx');
if (!mobileBillingSource.includes('automaticDiscountApplied')) {
  fail('Mobile billing must display automatic discounts with pricing.automaticDiscountApplied.');
}

const frontendLocales = path.join(repoRoot, 'frontend', 'src', 'locales');
const mobileLocales = path.join(repoRoot, 'mobile', 'src', 'locales');
const en = JSON.parse(fs.readFileSync(path.join(frontendLocales, 'en', 'translation.json'), 'utf8'));
const requiredAdminBillingKeys = flattenKeys(en.adminBilling || {});
for (const entry of fs.readdirSync(frontendLocales, { withFileTypes: true })) {
  if (!entry.isDirectory()) continue;
  const file = path.join(frontendLocales, entry.name, 'translation.json');
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  assertSoundPlanNames(entry.name, data, 'web');
  for (const key of requiredAdminBillingKeys) {
    const parts = key.split('.');
    let current = data.adminBilling;
    for (const part of parts) current = current?.[part];
    if (current === undefined) {
      fail(`${entry.name} is missing adminBilling.${key}.`);
      break;
    }
  }
}

for (const entry of fs.readdirSync(mobileLocales, { withFileTypes: true })) {
  if (!entry.isDirectory()) continue;
  const file = path.join(mobileLocales, entry.name, 'translation.json');
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  assertSoundPlanNames(entry.name, data, 'mobile');
  if (!data.pricing?.automaticDiscountApplied) {
    fail(`${entry.name} mobile locale is missing pricing.automaticDiscountApplied.`);
  }
}

if (!process.exitCode) {
  console.log('Billing localization audit passed.');
}
