/* eslint-disable no-console */
const {
  buildClassLessonDisplayParts,
  speechPartsFromDisplayParts,
} = require('../utils/aiConversation');

const phrases = {
  practiceTitle: '당신 차례입니다.',
  practicePromptSentence: '소리 내어 읽고 뜻을 말해 보세요.',
  practicePromptWord: '이것은 무슨 뜻인가요?',
  practicePromptFallback: '기억나는 것을 말해 보세요.',
  breakingDown: '함께 나누어 봅시다.',
  explaining: '짧게 설명해 보겠습니다.',
  explainCta: '더 깊이 배우고 싶으면 질문하세요.',
  letsLearn: '이 항목을 배워 봅시다.',
  teachCta: '따라 말해 보세요.',
  exampleHeader: '예',
  examplePrefix: '예:',
  practicePromptSentencePlain: '소리 내어 읽고 뜻을 말해 보세요.',
  practicePromptWordPlain: '이것은 무슨 뜻인가요?',
};

const action = {
  action: 'teach',
  itemType: 'word',
  activityTitle: '인사',
  target: '你好',
  learnerPronunciation: '니 하오',
  officialPronunciation: 'nǐ hǎo',
  native: '처음 만났을 때 쓰는 기본 인사입니다.',
  exampleTarget: '你好，很高兴认识你。',
  exampleNative: '안녕하세요, 만나서 반갑습니다.',
};

const teachParts = buildClassLessonDisplayParts('', 'zh', 'ko', action, phrases);
const teachSpeech = speechPartsFromDisplayParts(teachParts);
const practiceParts = buildClassLessonDisplayParts('', 'zh', 'ko', {
  ...action,
  action: 'practice',
  activityTask: '중국어로 인사해 보세요.',
}, phrases);
const practiceSpeech = speechPartsFromDisplayParts(practiceParts);

const issues = [];
if (!teachParts.some((part) => part.type === 'meta' && part.speak === false)) {
  issues.push('teach turn must keep non-spoken structure cues separate from spoken content.');
}
if (!teachParts.some((part) => part.type === 'target' && part.section === 'example')) {
  issues.push('teach turn must keep the example target line as its own part.');
}
if (!teachParts.some((part) => part.type === 'native' && part.section === 'example')) {
  issues.push('teach turn must keep the example native explanation as its own part.');
}
if (teachSpeech.map((part) => part.language).join(',') !== 'zh,ko,zh,ko,ko') {
  issues.push('teach audio must preserve target/native ordering so screen-off learners can follow the turn.');
}
if (!practiceSpeech.some((part) => part.language === 'ko' && part.text === '중국어로 인사해 보세요.')) {
  issues.push('practice turns must keep a learner task for non-English language pairs.');
}
if (practiceSpeech[0]?.language !== 'zh') {
  issues.push('practice audio must begin with the target-language material.');
}

const duplicateExampleParts = buildClassLessonDisplayParts('', 'ja', 'hi', {
  action: 'teach',
  itemType: 'note',
  activityTitle: 'आधार',
  target: '学習目標',
  native: 'समझें कि जापानी ध्वनि के लिए काना, अर्थ के लिए कांजी और भाषण की समय इकाई के रूप में मोरे का उपयोग करते हैं।',
  exampleTarget: '学習目標',
  exampleNative: 'संपूर्ण पाठ इस परिणाम की ओर बनाया गया है।',
}, phrases);
if (duplicateExampleParts.some((part) => part.section === 'example')) {
  issues.push('Tutor display parts must suppress duplicate examples when exampleTarget repeats the target exactly.');
}

if (issues.length) {
  console.error('Tutor response-shape audit failed:');
  issues.forEach((issue) => console.error(`- ${issue}`));
  process.exit(1);
}

console.log('Tutor response-shape audit passed.');
