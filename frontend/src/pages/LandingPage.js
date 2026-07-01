import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { setLandingLanguagePreference } from '../utils/publicLanguage';
import { getLanguageDisplayName } from '../config/languages';
import { reviewService } from '../services/api';
import {
  FiArrowRight,
  FiBookOpen,
  FiCheck,
  FiChevronLeft,
  FiChevronRight,
  FiEdit3,
  FiGlobe,
  FiHeart,
  FiLayers,
  FiMessageCircle,
  FiMic,
  FiRefreshCw,
  FiVolume2,
} from 'react-icons/fi';
import BrandLogo from '../components/BrandLogo';
import './LandingPage.css';

const highlightIcons = [FiBookOpen, FiMessageCircle, FiVolume2, FiRefreshCw];
const loopIcons = [FiBookOpen, FiEdit3, FiMic, FiLayers, FiRefreshCw];
const HERO_IMAGES = [
  { id: 'conversation', src: '/images/landing-hero-conversation.png' },
  { id: 'connected', src: '/images/landing-hero-learning-loop.png' },
  { id: 'cohort', src: '/images/landing-hero-cohort.png' },
  { id: 'business', src: '/images/landing-hero-business.png' },
];

const comparisonIcons = [
  FiBookOpen,
  FiMic,
  FiRefreshCw,
  FiEdit3,
  FiGlobe,
  FiLayers,
];

const LANDING_SECTION_COPY = {
  en: {
    heroImageAlt: 'Lingo Booth learner and connected practice activities',
    keyStrengthsLabel: 'Key strengths',
    highlights: [
      { title: 'Clear lessons', text: 'Step-by-step guidance with examples you can actually use.' },
      { title: 'Real speaking', text: 'Roleplays, voice input, replay, slower replies, and hands-free practice.' },
      { title: 'Sound that fits you', text: 'Pronunciation guidance shaped for your native language and script.' },
      { title: 'Steady progress', text: 'Track growth across speaking, listening, reading, and writing without losing the thread.' },
    ],
    loopTitle: 'The full learning loop, without the clutter',
    loopSteps: ['Learn', 'Practice', 'Speak', 'Write', 'Review'],
    comfortKicker: 'Built with learner comfort in mind',
    detailsTitle: 'Thoughtful details learners feel',
    details: [
      { title: 'Native-aware sounds', text: 'Hear the target language and explanations in the way that works best for you.' },
      { title: 'Separate target/native voices', text: 'Pick different voices so both languages sound natural.' },
      { title: 'Personalized real-life practice', text: 'Turn your words, goals, and situations into practice you will actually use.' },
      { title: 'Continue where you stopped', text: 'Your progress saves and resumes across activities and devices.' },
      { title: 'Works on web, mobile, and tablet', text: 'One experience, perfectly adapted to every screen.' },
    ],
    productPreviewLabel: 'Lingo Booth product preview',
    previewTabs: ['Class', 'Conversation', 'Review'],
    tutorLabel: 'Tutor',
    learningModeLabel: 'Learning mode',
    modes: {
      relaxed: { title: 'Relaxed', text: 'Low pressure, learn at your pace' },
      challenge: { title: 'Challenge', text: 'XP decay, streaks, and quests' },
    },
    learnAnywhereLabel: 'Learn anywhere',
    devices: ['Web', 'Mobile', 'Tablet'],
    comparisonTitle: 'Built for fluency, not just streaks',
    comparisonAriaLabel: 'Lingo Booth comparison',
    comparisonHeaders: ['Feature', 'Typical apps', 'Lingo Booth'],
    comparisonDeepDiveCta: 'See the full platform comparison',
    comparisonRows: [
      { feature: 'Language access', typical: 'Usually teaches from English or a small set of interface languages', lingo: '20 supported languages with up to 380 native-to-target learning paths, including non-Latin and RTL scripts' },
      { feature: 'Speaking practice', typical: 'Short pronunciation checks or typing-first exercises', lingo: 'Hands-free roleplays with voice input, replay, slower replies, and guided corrections for real situations' },
      { feature: 'Connected review', typical: 'Lessons, flashcards, writing, and conversation stay separate', lingo: 'Saved words, lessons, flashcards, writing, and conversation practice reinforce one another' },
      { feature: 'Writing support', typical: 'Often missing or limited to recognition', lingo: 'Trace, copy, listen, review meanings, check stroke order, and build writing memory' },
      { feature: 'Exam readiness', typical: 'Focuses on streaks or isolated drills', lingo: 'Builds speaking, listening, reading, writing, and the language principles behind standard exams' },
      { feature: 'Cross-device continuity', typical: 'Progress often feels split between web and app', lingo: 'One account continues lessons, quizzes, flashcards, and practice across web, mobile, and tablet' },
    ],
    statsLabel: 'Lingo Booth at a glance',
    stats: [
      { value: '20', label: 'languages to learn' },
      { value: '380', label: 'native-to-target pairs' },
      { value: '4', label: 'skills: speak, listen, read, write' },
      { value: '24/7', label: 'practice partner' },
    ],
    aiKicker: 'Your always-on practice partner',
    aiTitle: 'A patient tutor that never sleeps',
    aiText: 'Hold a real conversation any time of day. Your practice partner listens to how you speak, corrects you gently, remembers what you struggle with, and turns your real-life situations into roleplays you can rehearse before they happen.',
    aiPoints: [
      'Speak out loud and get instant, judgment-free feedback',
      'Say “repeat”, “slower”, or “stop”, fully hands-free',
      'Bring your own situation: a trip, an interview, a first date',
      'It remembers past sessions and your weak spots',
    ],
    aiCta: 'Start free',
    testimonialsKicker: 'Loved by learners',
    testimonialsTitle: 'People are actually speaking',
    testimonials: [
      { quote: 'What I like so much is the flashcards and the auto-play feature. It lets me keep learning even when I am working on the road with my phone in my bag.', name: 'Loveth', detail: 'Learning German' },
      { quote: 'The conversation feature is a game changer. I am completely sold.', name: 'Josiah', detail: 'Learning Korean' },
      { quote: 'I am preparing for the TOPIK exam and this app has been helping a lot in getting ready.', name: 'Mirian', detail: 'Learning Korean' },
      { quote: 'It felt so easy to start as a personal learner, but now I am getting ready to join the semester program. I want that accountability, I know myself.', name: 'IK', detail: 'Learning Japanese' },
    ],
    faqTitle: 'Questions, answered',
    faq: [
      { q: 'Is it really free to start?', a: 'Yes. You can start learning for free, and you can even try a lesson as a guest without creating an account. No credit card required.' },
      { q: 'Which languages can I learn?', a: 'Lingo Booth supports 20 languages as both the language you learn and the language you learn in, up to 380 native-to-target pairs.' },
      { q: 'I am a total beginner. Is this for me?', a: 'Absolutely. Lessons start from your very first word, with explanations in your own language, and a continuous path takes you from beginner to advanced.' },
      { q: 'Can it help me prepare for exams?', a: 'Yes. Lingo Booth builds the four core skills and the language principles behind exams like TOPIK, JLPT, HSK, DELE, and IELTS.' },
      { q: 'Does it work on my phone?', a: 'Yes. One account works across web, mobile, and tablet, and your progress syncs across all of them.' },
    ],
    learningPrefix: 'Learning',
  },
  ko: {
    heroImageAlt: 'Lingo Booth 학습자와 연결된 연습 활동',
    keyStrengthsLabel: '주요 장점',
    highlights: [
      { title: '명확한 수업', text: '실제로 쓸 수 있는 예문으로 차근차근 배웁니다.' },
      { title: '실제 말하기 연습', text: '역할극, 음성 입력, 다시 듣기, 느린 말하기, 핸즈프리 연습을 지원합니다.' },
      { title: '나에게 맞는 발음', text: '내 모국어와 문자 체계에 맞춘 발음 안내를 제공합니다.' },
      { title: '꾸준한 성장', text: '부담 없이 배우거나 동기부여가 필요할 때 도전 모드를 선택하세요.' },
    ],
    loopTitle: '복잡하지 않은 전체 학습 흐름',
    loopSteps: ['배우기', '연습', '말하기', '쓰기', '복습'],
    comfortKicker: '학습자가 편하게 느끼도록 설계',
    detailsTitle: '학습 중에 바로 느껴지는 세심한 기능',
    details: [
      { title: '모국어를 고려한 소리', text: '목표 언어와 설명을 나에게 가장 잘 맞는 방식으로 듣습니다.' },
      { title: '언어별 다른 목소리', text: '목표 언어와 모국어 설명이 각각 자연스럽게 들리도록 목소리를 나눕니다.' },
      { title: '생활 맞춤 연습', text: '내 단어, 목표, 상황을 실제로 쓸 수 있는 연습으로 바꿉니다.' },
      { title: '이어서 학습', text: '진도는 저장되고 활동과 기기 사이에서 이어집니다.' },
      { title: '웹, 모바일, 태블릿 지원', text: '화면에 맞게 조정되는 하나의 학습 경험을 제공합니다.' },
    ],
    productPreviewLabel: 'Lingo Booth 학습 미리보기',
    previewTabs: ['수업', '대화 연습', '복습'],
    tutorLabel: '튜터',
    learningModeLabel: '학습 모드',
    modes: {
      relaxed: { title: '편안한 모드', text: '부담 없이 내 속도로 학습' },
      challenge: { title: '도전 모드', text: 'XP 감소, 연속 학습, 퀘스트' },
    },
    learnAnywhereLabel: '어디서나 학습',
    devices: ['웹', '모바일', '태블릿'],
    comparisonTitle: '단순한 기록이 아닌, 실력을 위한 학습',
    comparisonAriaLabel: 'Lingo Booth 비교',
    comparisonHeaders: ['기능', '일반 앱', 'Lingo Booth'],
    comparisonRows: [
      { feature: '수업', typical: '제한적이거나 글 중심', lingo: '단계와 예문이 명확한 가이드형 수업' },
      { feature: '말하기', typical: '입력 중심의 제한된 연습', lingo: '핸즈프리 역할극과 음성 명령 - 다시, 천천히, 멈춤' },
      { feature: '발음', typical: '로마자 표기 하나에 의존', lingo: '항목마다 공식 발음, 학습자용 발음 안내, 음성 중심 지원' },
      { feature: '목소리', typical: '두 언어를 같은 목소리로 읽음', lingo: '목표 언어와 모국어 설명에 다른 목소리를 사용할 수 있음' },
      { feature: '쓰기', typical: '거의 제공되지 않음', lingo: '따라 쓰기, 보고 쓰기, 듣고 쓰기, 뜻, 획순, 자기 점검' },
      { feature: '개인화', typical: '모두에게 같은 일반 콘텐츠', lingo: '내 생활 단어와 목표를 바탕으로 하되 저장 전 사용자가 확인' },
      { feature: '학습 모드', typical: '모두에게 같은 속도', lingo: '편안한 모드와 XP 감소, 연속 학습, 퀘스트가 있는 도전 모드' },
      { feature: '이어서 학습', typical: '매번 처음부터 시작', lingo: '퀴즈, 플래시카드, 수업이 기기 간 이어짐' },
      { feature: '기기 연동', typical: '웹 전용 또는 앱 전용', lingo: '웹, 모바일, 태블릿에서 하나의 학습 공간' },
      { feature: '백그라운드 오디오', typical: '화면이 꺼지면 중단', lingo: '걷거나 이동할 때도 잠금 화면에서 계속 재생' },
      { feature: '언어 지원', typical: '한 언어 또는 라틴 문자 중심', lingo: '다양한 언어쌍, RTL 문자, 현지화된 화면 지원' },
      { feature: '진도', typical: '연속 학습 기록 중심', lingo: '듣기, 말하기, 읽기, 쓰기 전반의 실력 진도' },
    ],
  },
};

// Keep these aliases for React dev-server hot updates that may still reference
// the old static arrays while the module is being refreshed.
/* eslint-disable no-unused-vars */
const highlights = LANDING_SECTION_COPY.en.highlights.map((item, index) => ({ ...item, icon: highlightIcons[index] }));
const loopSteps = LANDING_SECTION_COPY.en.loopSteps.map((label, index) => ({ label, icon: loopIcons[index] }));
const comparisonRows = LANDING_SECTION_COPY.en.comparisonRows.map((item, index) => ({ ...item, icon: comparisonIcons[index] }));
/* eslint-enable no-unused-vars */

const LANGUAGE_OPTIONS = [
  { code: 'en', displayCode: 'en', name: 'English' },
  { code: 'ko', displayCode: 'kr', name: '한국어' },
  { code: 'es', displayCode: 'es', name: 'Español' },
  { code: 'fr', displayCode: 'fr', name: 'Français' },
  { code: 'de', displayCode: 'de', name: 'Deutsch' },
  { code: 'zh', displayCode: 'zh', name: '中文' },
  { code: 'ja', displayCode: 'jp', name: '日本語' },
  { code: 'hi', displayCode: 'hi', name: 'हिन्दी' },
  { code: 'ar', displayCode: 'ar', name: 'العربية' },
  { code: 'he', displayCode: 'he', name: 'עברית' },
  { code: 'pt', displayCode: 'pt', name: 'Português' },
  { code: 'it', displayCode: 'it', name: 'Italiano' },
  { code: 'nl', displayCode: 'nl', name: 'Nederlands' },
  { code: 'ru', displayCode: 'ru', name: 'Русский' },
  { code: 'id', displayCode: 'id', name: 'Bahasa Indonesia' },
  { code: 'ms', displayCode: 'ms', name: 'Bahasa Melayu' },
  { code: 'fil', displayCode: 'ph', name: 'Filipino' },
  { code: 'tr', displayCode: 'tr', name: 'Türkçe' },
  { code: 'bn', displayCode: 'bn', name: 'বাংলা' },
  { code: 'ta', displayCode: 'ta', name: 'தமிழ்' },
];

const SUPPORTED_LANGUAGE_CODES = new Set(LANGUAGE_OPTIONS.map(({ code }) => code));

const REGION_LANGUAGE_HINTS = {
  KR: 'ko',
  KP: 'ko',
  JP: 'ja',
  CN: 'zh',
  TW: 'zh',
  HK: 'zh',
  MO: 'zh',
  IN: 'hi',
  BD: 'bn',
  LK: 'ta',
  SA: 'ar',
  AE: 'ar',
  EG: 'ar',
  IL: 'he',
  ES: 'es',
  MX: 'es',
  AR: 'es',
  CO: 'es',
  CL: 'es',
  PE: 'es',
  FR: 'fr',
  DE: 'de',
  AT: 'de',
  BR: 'pt',
  PT: 'pt',
  IT: 'it',
  NL: 'nl',
  RU: 'ru',
  ID: 'id',
  MY: 'ms',
  PH: 'fil',
  TR: 'tr',
};

const TIMEZONE_LANGUAGE_HINTS = [
  [/Seoul/i, 'ko'],
  [/Tokyo/i, 'ja'],
  [/Shanghai|Chongqing|Urumqi|Taipei|Hong_Kong|Macau/i, 'zh'],
  [/Kolkata|Calcutta/i, 'hi'],
  [/Dhaka/i, 'bn'],
  [/Riyadh|Dubai|Qatar|Kuwait|Cairo|Amman|Beirut|Baghdad/i, 'ar'],
  [/Jerusalem/i, 'he'],
  [/Madrid|Mexico_City|Buenos_Aires|Bogota|Santiago|Lima/i, 'es'],
  [/Paris/i, 'fr'],
  [/Berlin|Vienna|Zurich/i, 'de'],
  [/Sao_Paulo|Lisbon/i, 'pt'],
  [/Rome/i, 'it'],
  [/Amsterdam/i, 'nl'],
  [/Moscow/i, 'ru'],
  [/Jakarta/i, 'id'],
  [/Kuala_Lumpur/i, 'ms'],
  [/Manila/i, 'fil'],
  [/Istanbul/i, 'tr'],
];

const LANDING_COPY = {
  en: {
    login: 'Login',
    startFree: 'Start free',
    tryGuest: 'Try a lesson as guest',
    exploreFeatures: 'Explore features',
    languageLabel: 'Homepage language',
    pairPrefix: 'Suggested path',
    heroTitle: 'Actually speak your new language, not just collect streaks.',
    heroSubtitle: 'Practice real conversations with a personal tutor that listens, corrects, and adapts across guided lessons, speaking, writing, and review. 20 languages, taught in your own native language.',
    heroTrust: ['No credit card needed', 'Guest lesson available', 'Progress saves with an account'],
    alreadyHaveAccount: 'Already have an account?',
    previewMessage: 'Great. Let us practice ordering coffee. What would you like to order?',
    guideTitle: 'Practice preview',
    ctaTitle: 'Start speaking a new language today',
    ctaText: 'Free to start on web, mobile, and tablet. No credit card required.',
  },
  ko: {
    login: '로그인',
    startFree: '무료로 시작',
    tryGuest: '게스트로 체험',
    exploreFeatures: '기능 살펴보기',
    languageLabel: '홈페이지 언어',
    pairPrefix: '추천 학습 경로',
    heroTitle: '언어 학습의 말하기, 듣기, 읽기, 쓰기를 한곳에서',
    heroSubtitle: '체계적인 수업, 발음 안내, 플래시카드, 대화 연습, 진도 관리를 웹과 모바일, 태블릿에서 함께 사용하세요.',
    previewMessage: '좋아요. 주문 연습을 해 봅시다. 무엇을 주문하고 싶나요?',
    guideTitle: '연습 미리보기',
    ctaTitle: '오늘부터 더 자신 있게 언어 학습을 시작하세요',
    ctaText: '웹, 모바일, 태블릿에서 학습하세요.',
  },
  es: {
    login: 'Iniciar sesión',
    startFree: 'Empieza gratis',
    tryGuest: 'Probar como invitado',
    languageLabel: 'Idioma de la página',
    pairPrefix: 'Ruta sugerida',
    heroTitle: 'Aprende idiomas con todas las habilidades en un solo lugar',
    heroSubtitle: 'Practica hablar, escuchar, leer y escribir con clases guiadas, pronunciación adaptada, tarjetas, conversación y progreso en web, móvil y tablet.',
    previewMessage: 'Muy bien. Practiquemos pedir café. ¿Qué te gustaría pedir?',
    guideTitle: 'Vista previa de práctica',
    ctaTitle: 'Empieza a aprender con claridad hoy',
    ctaText: 'Aprende en web, móvil o tablet.',
  },
  fr: {
    login: 'Connexion',
    startFree: 'Commencer gratuitement',
    tryGuest: 'Essayer en invité',
    languageLabel: 'Langue de la page',
    pairPrefix: 'Parcours suggéré',
    heroTitle: 'Apprenez les langues avec toutes les compétences au même endroit',
    heroSubtitle: 'Travaillez l’oral, l’écoute, la lecture et l’écriture avec des cours guidés, une prononciation adaptée, des cartes, des conversations et un suivi des progrès.',
    previewMessage: 'Très bien. Entraînons-nous à commander un café. Que voulez-vous commander ?',
    guideTitle: 'Aperçu de pratique',
    ctaTitle: 'Commencez à apprendre clairement aujourd’hui',
    ctaText: 'Apprenez sur le web, mobile ou tablette.',
  },
  de: {
    login: 'Einloggen',
    startFree: 'Kostenlos starten',
    tryGuest: 'Als Gast testen',
    languageLabel: 'Seitensprache',
    pairPrefix: 'Empfohlener Weg',
    heroTitle: 'Sprachen mit allen Fähigkeiten an einem Ort lernen',
    heroSubtitle: 'Übe Sprechen, Hören, Lesen und Schreiben mit geführten Lektionen, passender Aussprache, Karten, Gesprächen und Fortschritt auf Web, Mobilgerät und Tablet.',
    previewMessage: 'Gut. Üben wir, Kaffee zu bestellen. Was möchten Sie bestellen?',
    guideTitle: 'Übungsvorschau',
    ctaTitle: 'Beginne heute klarer zu lernen',
    ctaText: 'Lerne im Web, auf dem Handy oder Tablet.',
  },
  zh: {
    login: '登录',
    startFree: '免费开始',
    tryGuest: '游客体验',
    languageLabel: '页面语言',
    pairPrefix: '推荐路径',
    heroTitle: '在一个地方学习语言的听说读写',
    heroSubtitle: '通过引导课程、适合你的发音提示、词卡、对话练习和进度追踪，在网页、手机和平板上学习。',
    previewMessage: '很好。我们来练习点咖啡。你想点什么？',
    guideTitle: '练习预览',
    ctaTitle: '今天清楚地开始学习',
    ctaText: '在网页、手机或平板上学习。',
  },
  ja: {
    login: 'ログイン',
    startFree: '無料で始める',
    tryGuest: 'ゲストで試す',
    languageLabel: 'ページの言語',
    pairPrefix: 'おすすめの学習',
    heroTitle: '言語学習の聞く・話す・読む・書くを一か所で',
    heroSubtitle: 'ガイド付きレッスン、あなたに合う発音ガイド、単語カード、会話練習、進捗管理をウェブ・モバイル・タブレットで使えます。',
    previewMessage: 'いいですね。コーヒーを注文する練習をしましょう。何を注文したいですか？',
    guideTitle: '練習プレビュー',
    ctaTitle: '今日からわかりやすく学び始めましょう',
    ctaText: 'ウェブ、モバイル、タブレットで学べます。',
  },
  hi: {
    login: 'लॉग इन',
    startFree: 'मुफ्त शुरू करें',
    tryGuest: 'मेहमान के रूप में आज़माएँ',
    languageLabel: 'पेज की भाषा',
    pairPrefix: 'सुझाया गया रास्ता',
    heroTitle: 'भाषा सीखने का बोलना, सुनना, पढ़ना और लिखना एक ही जगह',
    heroSubtitle: 'निर्देशित पाठ, आपके लिए उपयुक्त उच्चारण, फ्लैशकार्ड, बातचीत अभ्यास और प्रगति ट्रैकिंग वेब, मोबाइल और टैबलेट पर।',
    previewMessage: 'अच्छा। चलिए कॉफी ऑर्डर करने का अभ्यास करते हैं। आप क्या ऑर्डर करना चाहेंगे?',
    guideTitle: 'अभ्यास झलक',
    ctaTitle: 'आज स्पष्ट तरीके से सीखना शुरू करें',
    ctaText: 'वेब, मोबाइल या टैबलेट पर सीखें।',
  },
  ar: {
    login: 'تسجيل الدخول',
    startFree: 'ابدأ مجانًا',
    tryGuest: 'جرّب كضيف',
    languageLabel: 'لغة الصفحة',
    pairPrefix: 'المسار المقترح',
    heroTitle: 'تعلّم اللغات مهارةً بمهارة في مكان واحد',
    heroSubtitle: 'تدرّب على التحدث والاستماع والقراءة والكتابة بدروس موجهة، ونطق مناسب لك، وبطاقات، ومحادثة، وتتبع للتقدم.',
    previewMessage: 'جيد. لنتدرّب على طلب القهوة. ماذا تريد أن تطلب؟',
    guideTitle: 'معاينة التدريب',
    ctaTitle: 'ابدأ التعلم بوضوح اليوم',
    ctaText: 'تعلّم على الويب أو الهاتف أو الجهاز اللوحي.',
  },
  he: {
    login: 'כניסה',
    startFree: 'התחלה בחינם',
    tryGuest: 'נסו כאורח',
    languageLabel: 'שפת הדף',
    pairPrefix: 'מסלול מומלץ',
    heroTitle: 'לומדים שפות בכל המיומנויות במקום אחד',
    heroSubtitle: 'תרגלו דיבור, האזנה, קריאה וכתיבה עם שיעורים מודרכים, הגייה מותאמת, כרטיסיות, שיחה ומעקב התקדמות.',
    previewMessage: 'יופי. נתרגל הזמנת קפה. מה תרצו להזמין?',
    guideTitle: 'תצוגת תרגול',
    ctaTitle: 'התחילו ללמוד בבהירות היום',
    ctaText: 'למדו בדפדפן, בנייד או בטאבלט.',
  },
  pt: {
    login: 'Entrar',
    startFree: 'Começar grátis',
    tryGuest: 'Testar como convidado',
    languageLabel: 'Idioma da página',
    pairPrefix: 'Caminho sugerido',
    heroTitle: 'Aprenda idiomas com todas as habilidades em um só lugar',
    heroSubtitle: 'Pratique fala, escuta, leitura e escrita com aulas guiadas, pronúncia adaptada, cartões, conversas e progresso no web, celular e tablet.',
    previewMessage: 'Ótimo. Vamos praticar pedir café. O que você gostaria de pedir?',
    guideTitle: 'Prévia da prática',
    ctaTitle: 'Comece a aprender com clareza hoje',
    ctaText: 'Aprenda no web, celular ou tablet.',
  },
  it: {
    login: 'Accedi',
    startFree: 'Inizia gratis',
    tryGuest: 'Prova come ospite',
    languageLabel: 'Lingua della pagina',
    pairPrefix: 'Percorso suggerito',
    heroTitle: 'Impara le lingue con tutte le abilità in un unico posto',
    heroSubtitle: 'Esercitati in parlato, ascolto, lettura e scrittura con lezioni guidate, pronuncia adatta a te, flashcard, conversazioni e progressi.',
    previewMessage: 'Ottimo. Esercitiamoci a ordinare un caffè. Che cosa vorresti ordinare?',
    guideTitle: 'Anteprima pratica',
    ctaTitle: 'Inizia oggi a imparare con chiarezza',
    ctaText: 'Impara su web, mobile o tablet.',
  },
  nl: {
    login: 'Inloggen',
    startFree: 'Gratis starten',
    tryGuest: 'Probeer als gast',
    languageLabel: 'Paginataal',
    pairPrefix: 'Voorgesteld pad',
    heroTitle: 'Leer talen met alle vaardigheden op één plek',
    heroSubtitle: 'Oefen spreken, luisteren, lezen en schrijven met begeleide lessen, passende uitspraak, kaarten, gesprekken en voortgang.',
    previewMessage: 'Goed. Laten we oefenen met koffie bestellen. Wat wil je bestellen?',
    guideTitle: 'Oefenvoorbeeld',
    ctaTitle: 'Begin vandaag duidelijk met leren',
    ctaText: 'Leer op web, mobiel of tablet.',
  },
  ru: {
    login: 'Войти',
    startFree: 'Начать бесплатно',
    tryGuest: 'Попробовать как гость',
    languageLabel: 'Язык страницы',
    pairPrefix: 'Рекомендуемый путь',
    heroTitle: 'Учите языки: говорение, аудирование, чтение и письмо в одном месте',
    heroSubtitle: 'Занимайтесь с пошаговыми уроками, подсказками по произношению, карточками, разговорной практикой и отслеживанием прогресса.',
    previewMessage: 'Отлично. Давайте потренируемся заказывать кофе. Что вы хотите заказать?',
    guideTitle: 'Предпросмотр практики',
    ctaTitle: 'Начните учиться ясно уже сегодня',
    ctaText: 'Учитесь в браузере, на телефоне или планшете.',
  },
  id: {
    login: 'Masuk',
    startFree: 'Mulai gratis',
    tryGuest: 'Coba sebagai tamu',
    languageLabel: 'Bahasa halaman',
    pairPrefix: 'Jalur yang disarankan',
    heroTitle: 'Belajar bahasa dengan semua keterampilan di satu tempat',
    heroSubtitle: 'Latih berbicara, mendengar, membaca, dan menulis dengan kelas terpandu, pengucapan yang sesuai, kartu, percakapan, dan progres.',
    previewMessage: 'Bagus. Mari berlatih memesan kopi. Apa yang ingin kamu pesan?',
    guideTitle: 'Pratinjau latihan',
    ctaTitle: 'Mulai belajar dengan jelas hari ini',
    ctaText: 'Belajar di web, ponsel, atau tablet.',
  },
  ms: {
    login: 'Log masuk',
    startFree: 'Mula percuma',
    tryGuest: 'Cuba sebagai tetamu',
    languageLabel: 'Bahasa halaman',
    pairPrefix: 'Laluan disyorkan',
    heroTitle: 'Belajar bahasa dengan semua kemahiran di satu tempat',
    heroSubtitle: 'Latih bercakap, mendengar, membaca dan menulis dengan kelas berpandu, sebutan yang sesuai, kad imbas, perbualan dan kemajuan.',
    previewMessage: 'Bagus. Mari berlatih memesan kopi. Apa yang anda mahu pesan?',
    guideTitle: 'Pratonton latihan',
    ctaTitle: 'Mula belajar dengan jelas hari ini',
    ctaText: 'Belajar di web, telefon atau tablet.',
  },
  fil: {
    login: 'Mag-log in',
    startFree: 'Magsimula nang libre',
    tryGuest: 'Subukan bilang bisita',
    languageLabel: 'Wika ng pahina',
    pairPrefix: 'Iminungkahing landas',
    heroTitle: 'Matuto ng wika sa lahat ng kasanayan sa isang lugar',
    heroSubtitle: 'Magpraktis ng pagsasalita, pakikinig, pagbabasa, at pagsusulat gamit ang gabay na aralin, angkop na bigkas, flashcards, usapan, at progreso.',
    previewMessage: 'Magaling. Magpraktis tayo umorder ng kape. Ano ang gusto mong orderin?',
    guideTitle: 'Preview ng praktis',
    ctaTitle: 'Magsimulang matuto nang malinaw ngayon',
    ctaText: 'Matuto sa web, mobile, o tablet.',
  },
  tr: {
    login: 'Giriş yap',
    startFree: 'Ücretsiz başla',
    tryGuest: 'Misafir olarak dene',
    languageLabel: 'Sayfa dili',
    pairPrefix: 'Önerilen yol',
    heroTitle: 'Dil öğrenmeyi tüm becerilerle tek yerde öğren',
    heroSubtitle: 'Konuşma, dinleme, okuma ve yazmayı rehberli dersler, uygun telaffuz, kartlar, konuşma pratiği ve ilerleme takibiyle çalış.',
    previewMessage: 'Güzel. Kahve siparişi vermeyi çalışalım. Ne sipariş etmek istersin?',
    guideTitle: 'Pratik önizlemesi',
    ctaTitle: 'Bugün net bir şekilde öğrenmeye başla',
    ctaText: 'Web, mobil veya tablette öğren.',
  },
  bn: {
    login: 'লগ ইন',
    startFree: 'বিনামূল্যে শুরু করুন',
    tryGuest: 'অতিথি হিসেবে চেষ্টা করুন',
    languageLabel: 'পেজের ভাষা',
    pairPrefix: 'প্রস্তাবিত পথ',
    heroTitle: 'এক জায়গায় ভাষা শেখার বলা, শোনা, পড়া ও লেখা শিখুন',
    heroSubtitle: 'গাইডেড ক্লাস, আপনার জন্য মানানসই উচ্চারণ, ফ্ল্যাশকার্ড, কথোপকথন অনুশীলন এবং অগ্রগতি ট্র্যাকিং ব্যবহার করুন।',
    previewMessage: 'ভালো। কফি অর্ডার করার অনুশীলন করি। আপনি কী অর্ডার করতে চান?',
    guideTitle: 'অনুশীলনের ঝলক',
    ctaTitle: 'আজ পরিষ্কারভাবে শেখা শুরু করুন',
    ctaText: 'ওয়েব, মোবাইল বা ট্যাবলেটে শিখুন।',
  },
  ta: {
    login: 'உள்நுழை',
    startFree: 'இலவசமாக தொடங்கு',
    tryGuest: 'விருந்தினராக முயற்சி செய்',
    languageLabel: 'பக்க மொழி',
    pairPrefix: 'பரிந்துரைக்கப்பட்ட பாதை',
    heroTitle: 'மொழி கற்றலின் பேசுதல், கேட்குதல், வாசித்தல், எழுதுதல் அனைத்தையும் ஒரே இடத்தில் கற்பீர்',
    heroSubtitle: 'வழிகாட்டும் வகுப்புகள், உங்களுக்கு ஏற்ற உச்சரிப்பு, கார்டுகள், உரையாடல் பயிற்சி மற்றும் முன்னேற்றத்துடன் கற்பீர்.',
    previewMessage: 'நன்று. காப்பி ஆர்டர் செய்வதைப் பயிற்சி செய்வோம். நீங்கள் என்ன ஆர்டர் செய்ய விரும்புகிறீர்கள்?',
    guideTitle: 'பயிற்சி முன்னோட்டம்',
    ctaTitle: 'இன்று தெளிவாகக் கற்றலைத் தொடங்குங்கள்',
    ctaText: 'வெப், மொபைல் அல்லது டேப்லெட்டில் கற்பீர்.',
  },
};

const SAMPLE_MEANINGS = {
  en: ['Hello', 'Nice to meet you', 'Thank you'],
  ko: ['안녕하세요', '처음 뵙겠습니다', '감사합니다'],
  es: ['Hola', 'Mucho gusto', 'Gracias'],
  fr: ['Bonjour', 'Enchanté', 'Merci'],
  de: ['Hallo', 'Schön, dich kennenzulernen', 'Danke'],
  zh: ['你好', '很高兴认识你', '谢谢'],
  ja: ['こんにちは', 'はじめまして', 'ありがとうございます'],
  hi: ['नमस्ते', 'आपसे मिलकर अच्छा लगा', 'धन्यवाद'],
  ar: ['مرحبًا', 'تشرفت بلقائك', 'شكرًا'],
  he: ['שלום', 'נעים להכיר', 'תודה'],
  pt: ['Olá', 'Prazer em conhecer você', 'Obrigado'],
  it: ['Ciao', 'Piacere di conoscerti', 'Grazie'],
  nl: ['Hallo', 'Leuk je te ontmoeten', 'Dank je'],
  ru: ['Привет', 'Приятно познакомиться', 'Спасибо'],
  id: ['Halo', 'Senang bertemu denganmu', 'Terima kasih'],
  ms: ['Helo', 'Gembira berjumpa dengan anda', 'Terima kasih'],
  fil: ['Kumusta', 'Ikinagagalak kitang makilala', 'Salamat'],
  tr: ['Merhaba', 'Tanıştığımıza memnun oldum', 'Teşekkürler'],
  bn: ['হ্যালো', 'আপনার সাথে দেখা করে ভালো লাগলো', 'ধন্যবাদ'],
  ta: ['வணக்கம்', 'உங்களை சந்தித்ததில் மகிழ்ச்சி', 'நன்றி'],
};

const ENGLISH_SAMPLE_PHRASES = ['Hello', 'Nice to meet you', 'Thank you'];
const KOREAN_SAMPLE_PHRASES = ['안녕하세요', '처음 뵙겠습니다', '감사합니다'];

function normalizeLanguageCode(value) {
  const raw = String(value || '').trim();
  if (!raw) return '';
  const lower = raw.toLowerCase();
  if (lower.startsWith('zh')) return 'zh';
  if (lower.startsWith('pt')) return 'pt';
  const base = lower.split(/[-_]/)[0];
  if (base === 'iw') return 'he';
  if (base === 'in') return 'id';
  if (base === 'tl') return 'fil';
  return base;
}

function regionFromLocale(value) {
  try {
    return new Intl.Locale(value).region || '';
  } catch {
    const parts = String(value || '').split(/[-_]/);
    return parts.length > 1 ? parts[1].toUpperCase() : '';
  }
}

function languageFromTimezone() {
  if (typeof Intl === 'undefined') return '';
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
  const match = TIMEZONE_LANGUAGE_HINTS.find(([pattern]) => pattern.test(timeZone));
  return match ? match[1] : '';
}

function detectLandingLanguage() {
  if (typeof window !== 'undefined') {
    const stored = window.localStorage.getItem('landingLanguage');
    if (SUPPORTED_LANGUAGE_CODES.has(stored)) return stored;
  }

  const languages = typeof navigator !== 'undefined'
    ? (navigator.languages?.length ? navigator.languages : [navigator.language])
    : [];

  for (const locale of languages) {
    const code = normalizeLanguageCode(locale);
    if (SUPPORTED_LANGUAGE_CODES.has(code)) return code;
  }

  for (const locale of languages) {
    const region = regionFromLocale(locale);
    const hinted = REGION_LANGUAGE_HINTS[region];
    if (hinted && SUPPORTED_LANGUAGE_CODES.has(hinted)) return hinted;
  }

  const timeZoneLanguage = languageFromTimezone();
  return SUPPORTED_LANGUAGE_CODES.has(timeZoneLanguage) ? timeZoneLanguage : 'en';
}

function languageMeta(code) {
  return LANGUAGE_OPTIONS.find(language => language.code === code) || LANGUAGE_OPTIONS[0];
}

function samplePhrasesFor(nativeCode, targetCode) {
  if (targetCode === 'ko') {
    return KOREAN_SAMPLE_PHRASES.map((target, index) => ({
      target,
      native: ENGLISH_SAMPLE_PHRASES[index],
    }));
  }

  const nativeMeanings = SAMPLE_MEANINGS[nativeCode] || SAMPLE_MEANINGS.en;
  return ENGLISH_SAMPLE_PHRASES.map((target, index) => ({
    target,
    native: nativeMeanings[index],
  }));
}

// Splits a translated string on the literal "Lingo Booth" and wraps each
// occurrence in brand-colored spans (dark "Lingo" + orange "Booth", matching
// the wordmark). Locales that keep the brand name as-is get the highlight;
// locales that translate it fall through as plain text.
function renderWithBrand(text, brandParts) {
  const parts = String(text).split(/(Lingo Booth)/g);
  return parts.map((part, index) =>
    part === 'Lingo Booth' ? (
      <span key={`brand-${index}`} className="landing-statement-brand">
        <span className="landing-statement-brand__lingo">{brandParts.lingo}</span>
        {' '}
        <span className="landing-statement-brand__booth">{brandParts.booth}</span>
      </span>
    ) : (
      part
    )
  );
}

function LandingPage() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [landingLanguage, setLandingLanguage] = useState(detectLandingLanguage);
  // First-time visitors see the full opening manifesto; returning visitors get a
  // one-line teaser with a "Read more" toggle (they've already read the pitch).
  // Read the flag synchronously on first render so returning users render
  // collapsed immediately — no flash of the full text before it hides.
  const [isReturningVisitor] = useState(() => {
    try { return window.localStorage.getItem('lb_landing_seen') === '1'; } catch { return false; }
  });
  const [manifestoOpen, setManifestoOpen] = useState(false);
  useEffect(() => {
    try { window.localStorage.setItem('lb_landing_seen', '1'); } catch { /* private mode */ }
  }, []);
  // Infinite carousel: track displayIndex 0..N+1 where position 0 holds a clone
  // of the last real slide and position N+1 holds a clone of the first real
  // slide, so the user always sees the edge of the "next" slide even when
  // wrapping. The logical heroImageIndex (0..N-1) is derived from displayIndex.
  const [displayIndex, setDisplayIndex] = useState(1);
  const [trackTransitionEnabled, setTrackTransitionEnabled] = useState(true);
  const [heroNavigationVersion, setHeroNavigationVersion] = useState(0);
  // When the user manually advances/picks a slide, keep that slide on screen
  // for 4x the normal interval (32s instead of 8s) so they have time to read
  // it. The flag is cleared on the next auto-advance, returning to the 8s
  // cadence — unless carouselFocused is still true (see below).
  const [userPickedSlide, setUserPickedSlide] = useState(false);
  // While the user is hovering (or has keyboard focus on) the carousel image,
  // use the same 4x cadence so the slide does not change underneath them.
  const [carouselFocused, setCarouselFocused] = useState(false);
  const heroImageIndex = HERO_IMAGES.length > 0
    ? (((displayIndex - 1) % HERO_IMAGES.length) + HERO_IMAGES.length) % HERO_IMAGES.length
    : 0;

  const landing = useMemo(() => {
    const nativeCode = landingLanguage;
    const targetCode = nativeCode === 'en' ? 'ko' : 'en';
    const native = languageMeta(nativeCode);
    const target = languageMeta(targetCode);
    const copy = LANDING_COPY[nativeCode] || LANDING_COPY.en;
    const sectionCopy = LANDING_SECTION_COPY[nativeCode] || LANDING_SECTION_COPY.en;
    return {
      nativeCode,
      targetCode,
      native,
      target,
      copy,
      exploreFeatures: copy.exploreFeatures || LANDING_COPY.en.exploreFeatures,
      sections: sectionCopy,
      highlights: sectionCopy.highlights.map((item, index) => ({ ...item, icon: highlightIcons[index] })),
      loopSteps: sectionCopy.loopSteps.map((label, index) => ({ label, icon: loopIcons[index] })),
      comparisonRows: sectionCopy.comparisonRows.map((item, index) => ({ ...item, icon: comparisonIcons[index] })),
      // New marketing sections live only on the English copy for now; other
      // locales fall back to English until translated.
      stats: sectionCopy.stats || LANDING_SECTION_COPY.en.stats,
      aiPoints: sectionCopy.aiPoints || LANDING_SECTION_COPY.en.aiPoints,
      testimonials: sectionCopy.testimonials || LANDING_SECTION_COPY.en.testimonials,
      faq: sectionCopy.faq || LANDING_SECTION_COPY.en.faq,
      isRtl: ['ar', 'he'].includes(nativeCode),
      samplePhrases: samplePhrasesFor(nativeCode, targetCode),
    };
  }, [landingLanguage]);

  const landingLanguageT = useMemo(() => i18n.getFixedT(landingLanguage), [i18n, landingLanguage]);
  const brandParts = useMemo(() => ({
    lingo: t('brand.lingo', { lng: landingLanguage, defaultValue: 'Lingo' }),
    booth: t('brand.booth', { lng: landingLanguage, defaultValue: 'Booth' }),
  }), [landingLanguage, t]);

  // Approved reviews moderated in by an admin. Until any exist, the page falls
  // back to the curated seed testimonials in the section copy.
  const [approvedReviews, setApprovedReviews] = useState([]);
  useEffect(() => {
    let active = true;
    reviewService.listApproved()
      .then((res) => { if (active) setApprovedReviews(res.data?.reviews || []); })
      .catch(() => { /* keep seed testimonials on failure */ });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    const reduceMotion = typeof window !== 'undefined'
      && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion || HERO_IMAGES.length < 2) return undefined;

    // Quadruple the cadence (32s instead of 8s) whenever (a) the user just
    // manually navigated, or (b) the user's mouse/keyboard focus is on the
    // carousel image — gives plenty of time to read or examine the slide.
    const intervalMs = (userPickedSlide || carouselFocused) ? 32000 : 8000;
    const rotation = window.setInterval(() => {
      setTrackTransitionEnabled(true);
      setDisplayIndex((current) => current + 1);
      // After one auto-advance fires post-manual-nav, return to the normal
      // 8-second cadence (unless the user is still hovering, in which case
      // the carouselFocused flag keeps the next interval at 16s).
      setUserPickedSlide(false);
    }, intervalMs);

    return () => window.clearInterval(rotation);
  }, [heroNavigationVersion, userPickedSlide, carouselFocused]);

  // When the carousel lands on a clone (position 0 or N+1) the transitionEnd
  // handler disables the transition and snaps to the equivalent real slide.
  // This effect re-enables the transition on the next frame so future moves
  // animate normally.
  useEffect(() => {
    if (trackTransitionEnabled) return undefined;
    const id = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => setTrackTransitionEnabled(true));
    });
    return () => window.cancelAnimationFrame(id);
  }, [trackTransitionEnabled]);

  const showHeroSlide = (index) => {
    setTrackTransitionEnabled(true);
    setDisplayIndex(index + 1);
    setUserPickedSlide(true);
    setHeroNavigationVersion((current) => current + 1);
  };

  const stepHeroSlide = (direction) => {
    setTrackTransitionEnabled(true);
    setDisplayIndex((current) => current + direction);
    setUserPickedSlide(true);
    setHeroNavigationVersion((current) => current + 1);
  };

  const handleTrackTransitionEnd = (event) => {
    // Only react to the track's OWN transform transition. Child <img>s also
    // have a `transform: scale(...)` transition (for the active-slide pop)
    // which is shorter (700ms vs the track's 900ms) and bubbles up to this
    // handler. Without this guard, the snap-back to the real slide would fire
    // ~200ms before the track finished sliding, producing a visible jolt on
    // the wrap from slide 4 → slide 1.
    if (event.target !== event.currentTarget) return;
    if (event.propertyName !== 'transform') return;
    const N = HERO_IMAGES.length;
    if (N < 2) return;
    if (displayIndex >= N + 1) {
      // We just animated onto the clone of the first slide at the end of the
      // track. Snap back to the real first slide (displayIndex=1) without
      // animation so the next forward step continues smoothly.
      setTrackTransitionEnabled(false);
      setDisplayIndex(1);
    } else if (displayIndex <= 0) {
      // We just animated onto the clone of the last slide at the start of the
      // track. Snap forward to the real last slide (displayIndex=N).
      setTrackTransitionEnabled(false);
      setDisplayIndex(N);
    }
  };

  const carouselControlLabel = t('landing.heroCarousel.controlsLabel', {
    lng: landingLanguage,
    defaultValue: 'Hero image carousel controls',
  });
  const previousSlideLabel = t('landing.heroCarousel.previous', {
    lng: landingLanguage,
    defaultValue: 'Previous hero slide',
  });
  const nextSlideLabel = t('landing.heroCarousel.next', {
    lng: landingLanguage,
    defaultValue: 'Next hero slide',
  });

  const heroSlides = useMemo(() => [
    {
      ...HERO_IMAGES[0],
      title: t('landing.heroSlides.conversationPracticeFeature.title', {
        lng: landingLanguage,
        defaultValue: 'Conversation Practice for real-life speaking.',
      }),
      subtitle: t('landing.heroSlides.conversationPracticeFeature.subtitle', {
        lng: landingLanguage,
        defaultValue: 'Choose everyday scenarios, speak out loud, use hands-free mode, and get guided corrections that help you sound more natural.',
      }),
    },
    {
      ...HERO_IMAGES[1],
      title: t('landing.heroSlides.connectedReviewFeature.title', {
        lng: landingLanguage,
        defaultValue: 'Connected Review Loop across the whole app.',
      }),
      subtitle: t('landing.heroSlides.connectedReviewFeature.subtitle', {
        lng: landingLanguage,
        defaultValue: 'Lessons, saved words, flashcards, writing, and conversation practice stay connected so each activity reinforces the next one.',
      }),
    },
    {
      ...HERO_IMAGES[2],
      title: t('landing.heroSlides.semesterCohortFeature.title', {
        lng: landingLanguage,
        defaultValue: 'Semester Cohorts for structure and accountability.',
      }),
      subtitle: t('landing.heroSlides.semesterCohortFeature.subtitle', {
        lng: landingLanguage,
        defaultValue: 'Join a semester-style learning path with shared goals, guided materials, progress rhythm, and a clear finish line that keeps you moving.',
      }),
    },
    {
      ...HERO_IMAGES[3],
      title: t('landing.heroSlides.businessTravelFeature.title', {
        lng: landingLanguage,
        defaultValue: 'Business and Travel Practice before you arrive.',
      }),
      subtitle: t('landing.heroSlides.businessTravelFeature.subtitle', {
        lng: landingLanguage,
        defaultValue: 'Rehearse professional greetings, meeting phrases, travel situations, and relocation conversations on the devices you already use.',
      }),
    },
  ], [landingLanguage, t]);

  const activeHeroSlide = heroSlides[heroImageIndex];

  // Render the hero track as [lastClone, ...slides, firstClone] so we can keep
  // peeking the "next" slide on both ends and wrap around seamlessly.
  const heroTrackSlides = useMemo(() => {
    if (heroSlides.length < 2) return heroSlides;
    return [
      heroSlides[heroSlides.length - 1],
      ...heroSlides,
      heroSlides[0],
    ];
  }, [heroSlides]);
  const sec = (key) => landing.sections[key] || LANDING_SECTION_COPY.en[key];

  const displayedTestimonials = approvedReviews.length
    ? approvedReviews.map((review) => {
        const code = String(review.targetLanguage || '');
        const langName = SUPPORTED_LANGUAGE_CODES.has(code)
          ? getLanguageDisplayName(code, landingLanguageT)
          : code;
        return {
          id: review._id,
          quote: review.comment,
          name: review.name,
          detail: langName ? `${sec('learningPrefix')} ${langName}` : '',
        };
      })
    : landing.testimonials.map((item, index) => ({ ...item, id: `seed-${index}` }));

  const handleLandingLanguageChange = (event) => {
    const code = event.target.value;
    setLandingLanguage(code);
    setLandingLanguagePreference(code);
  };

  const prepareSelectedPair = () => {
    localStorage.setItem('nativeLanguage', landing.nativeCode);
    localStorage.setItem('targetLanguage', landing.targetCode);
    setLandingLanguagePreference(landing.nativeCode);
  };

  const startFree = () => {
    prepareSelectedPair();
    navigate('/select-language?mode=register');
  };

  const tryGuest = () => {
    prepareSelectedPair();
    navigate('/select-language?mode=guest');
  };

  const viewFullComparison = () => {
    setLandingLanguagePreference(landing.nativeCode);
    navigate('/compare');
  };

  return (
    <div className={`landing-page${landing.isRtl ? ' landing-rtl' : ''}`} lang={landing.nativeCode} dir={landing.isRtl ? 'rtl' : 'ltr'}>
      <header className="landing-nav">
        <div className="landing-nav-inner">
          <button type="button" className="landing-brand" onClick={() => navigate('/')} aria-label={t('common.backToHome')}>
            <BrandLogo variant="lockup" decorative />
          </button>
          <div className="landing-nav-actions">
          <label className="landing-language-select">
            <span className="landing-language-icon" aria-hidden="true">
              <FiGlobe />
            </span>
            <select value={landingLanguage} onChange={handleLandingLanguageChange} aria-label={landing.copy.languageLabel}>
              {LANGUAGE_OPTIONS.map(language => (
                <option key={language.code} value={language.code}>
                  {getLanguageDisplayName(language.code, landingLanguageT)}
                </option>
              ))}
            </select>
          </label>
          <button type="button" className="landing-login landing-login--auth" onClick={() => navigate('/login')}>
            {landing.copy.login}
          </button>
          <button type="button" className="landing-login landing-login--secondary" onClick={() => navigate('/features')}>
            {landing.exploreFeatures}
          </button>
          <button type="button" className="landing-login landing-login--secondary landing-login--plans" onClick={() => navigate('/pricing')}>
            <span className="landing-login-label-full">{t('navbar.plans')}</span>
            <span className="landing-login-label-icon" aria-hidden="true">$</span>
          </button>
          </div>
        </div>
      </header>

      <main>
        <section className={`landing-statement${isReturningVisitor && !manifestoOpen ? ' landing-statement--collapsed' : ''}`} id="why">
          <div className="landing-statement-inner">
            <p className="landing-statement-teaser">
              {t('landing.statement.teaser', {
                lng: landingLanguage,
                defaultValue: 'Learn the language, not the streak — a full curriculum, taught in your own language.',
              })}
              <button
                type="button"
                className="landing-statement-toggle"
                aria-expanded={manifestoOpen}
                aria-controls="landing-manifesto"
                onClick={() => setManifestoOpen(true)}
              >
                {t('landing.statement.readMore', { lng: landingLanguage, defaultValue: 'Read more' })}{' '}
                <span aria-hidden="true">▾</span>
              </button>
            </p>
            <div className="landing-statement-full" id="landing-manifesto">
            <p className="landing-statement-line landing-statement-line--lead">
              {t('landing.statement.proveSerious', {
                lng: landingLanguage,
                defaultValue: 'Every day you proved you were serious.',
              })}
            </p>
            <p className="landing-statement-line landing-statement-line--lead">
              {t('landing.statement.cared', {
                lng: landingLanguage,
                defaultValue: 'Every day it proved it only cared about the streak.',
              })}
            </p>
            <p className="landing-statement-line landing-statement-line--lead">
              {t('landing.statement.notLearning', {
                lng: landingLanguage,
                defaultValue: 'That is not learning. That is a counter with a flame on it.',
              })}
            </p>
            <p className="landing-statement-line landing-statement-line--bridge">
              {t('landing.statement.walkAway', {
                lng: landingLanguage,
                defaultValue: 'Walk away from streak-chasing.',
              })}
            </p>
            <p className="landing-statement-line landing-statement-line--bridge">
              {t('landing.statement.takeSeriousness', {
                lng: landingLanguage,
                defaultValue: 'Take that seriousness where it gets results.',
              })}
            </p>
            <p className="landing-statement-line landing-statement-line--promise">
              {renderWithBrand(t('landing.statement.teaches', {
                lng: landingLanguage,
                defaultValue: 'Lingo Booth teaches the principles behind the language. Drills them with exercises. Then bends every example to your real-life needs, at your level.',
              }), brandParts)}
            </p>
            <p className="landing-statement-line landing-statement-line--promise">
              {t('landing.statement.curriculum', {
                lng: landingLanguage,
                defaultValue: 'A complete curriculum, guided end-to-end. Reading, writing, listening, speaking, review — working together, not stacked apart.',
              })}
            </p>
            <p className="landing-statement-line landing-statement-line--verdict">
              {t('landing.statement.actuallyUse', {
                lng: landingLanguage,
                defaultValue: 'Here you learn what you can actually use.',
              })}
            </p>
            <div className="landing-statement-cta-wrap">
              <button type="button" className="landing-statement-cta" onClick={startFree}>
                {t('landing.statement.cta', {
                  lng: landingLanguage,
                  defaultValue: 'Start learning.',
                })}
              </button>
            </div>
            {isReturningVisitor && (
              <button
                type="button"
                className="landing-statement-toggle landing-statement-toggle--less"
                aria-expanded={manifestoOpen}
                aria-controls="landing-manifesto"
                onClick={() => setManifestoOpen(false)}
              >
                {t('landing.statement.showLess', { lng: landingLanguage, defaultValue: 'Show less' })}{' '}
                <span aria-hidden="true">▴</span>
              </button>
            )}
            <a
              href="#learn"
              className="landing-statement-scroll"
              aria-label={t('landing.statement.scrollAria', {
                lng: landingLanguage,
                defaultValue: 'Scroll for more',
              })}
            >
              <span aria-hidden="true">↓</span>
            </a>
            </div>
          </div>
        </section>

        <section className={`landing-hero landing-hero--${activeHeroSlide.id}`} id="learn">
          <div className="landing-hero-copy" key={activeHeroSlide.id}>
            <h1>{activeHeroSlide.title}</h1>
            <p>
              {activeHeroSlide.subtitle}
            </p>
            <div className="landing-hero-actions">
              <button type="button" className="landing-primary" onClick={startFree}>
                {landing.copy.startFree}
              </button>
              <button type="button" className="landing-secondary" onClick={tryGuest}>
                {landing.copy.tryGuest}
              </button>
            </div>
            <ul className="landing-hero-trust" aria-label={landing.sections.statsLabel || LANDING_SECTION_COPY.en.statsLabel}>
              {(landing.copy.heroTrust || LANDING_COPY.en.heroTrust).map((item) => (
                <li key={item}>
                  <FiCheck aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="landing-hero-signin">
              {landing.copy.alreadyHaveAccount || 'Already have an account?'}{' '}
              <button type="button" className="landing-hero-signin-link" onClick={() => navigate('/login')}>
                {landing.copy.login}
              </button>
            </p>
          </div>

          <div
            className="landing-hero-visual"
            onMouseEnter={() => setCarouselFocused(true)}
            onMouseLeave={() => setCarouselFocused(false)}
            onFocusCapture={() => setCarouselFocused(true)}
            onBlurCapture={(event) => {
              // Only clear focus state when focus leaves the carousel entirely,
              // not when it moves between child elements (image → next image).
              if (!event.currentTarget.contains(event.relatedTarget)) {
                setCarouselFocused(false);
              }
            }}
          >
            <div
              className={'landing-hero-track' + (trackTransitionEnabled ? '' : ' is-snapping')}
              style={{
                /* Per-index step = slide width + gap = (100% - 60px) + 16px
                   = 100% - 44px. Pixel-based peek/gap reads correctly next
                   to the visual's locked 16:9 aspect ratio. */
                transform: `translateX(calc(${displayIndex} * -1 * (100% - 44px)))`,
              }}
              onTransitionEnd={handleTrackTransitionEnd}
            >
              {/* Render [lastClone, ...slides, firstClone] so the edge of the
                  next slide always peeks even when wrapping around. Each
                  slide is positioned at left = index * (100% - 44px) so
                  the spacing between slides is exactly (slide width + gap)
                  = (100% - 60px) + 16px = 100% - 44px at every viewport. */}
              {heroTrackSlides.map((slide, index) => (
                <img
                  key={`${slide.id}-${index}`}
                  src={slide.src}
                  alt={index === displayIndex ? landing.sections.heroImageAlt : ''}
                  className={'landing-hero-image' + (index === displayIndex ? ' is-active' : '')}
                  loading={index === 1 ? 'eager' : 'lazy'}
                  aria-hidden={index === displayIndex ? undefined : 'true'}
                  style={{ left: `calc(${index} * (100% - 44px))` }}
                />
              ))}
            </div>
          </div>

          <div className="landing-hero-carousel-controls" role="group" aria-label={carouselControlLabel}>
            <button
              type="button"
              className="landing-hero-carousel-arrow"
              aria-label={previousSlideLabel}
              onClick={() => stepHeroSlide(-1)}
            >
              <FiChevronLeft aria-hidden="true" />
            </button>
            <div className="landing-hero-carousel-dots">
              {heroSlides.map((slide, index) => (
                <button
                  key={slide.id}
                  type="button"
                  className={'landing-hero-carousel-dot' + (index === heroImageIndex ? ' is-active' : '')}
                  aria-label={t('landing.heroCarousel.showSlide', {
                    lng: landingLanguage,
                    defaultValue: 'Show hero slide {{number}}',
                    number: index + 1,
                  })}
                  aria-current={index === heroImageIndex ? 'true' : undefined}
                  onClick={() => showHeroSlide(index)}
                />
              ))}
            </div>
            <button
              type="button"
              className="landing-hero-carousel-arrow"
              aria-label={nextSlideLabel}
              onClick={() => stepHeroSlide(1)}
            >
              <FiChevronRight aria-hidden="true" />
            </button>
          </div>
        </section>

        <section className="landing-stats" aria-label={landing.sections.statsLabel || LANDING_SECTION_COPY.en.statsLabel}>
          {landing.stats.map(({ value, label }) => (
            <div className="landing-stat" key={label}>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </section>

        <section className="landing-highlights" aria-label={landing.sections.keyStrengthsLabel}>
          {landing.highlights.map(({ icon: Icon, title, text }) => (
            <article key={title}>
              <Icon aria-hidden="true" />
              <h2>{title}</h2>
              <p>{text}</p>
            </article>
          ))}
        </section>

        <section className="landing-ai" aria-label={landing.sections.aiTitle || LANDING_SECTION_COPY.en.aiTitle}>
          <div className="landing-ai-copy">
            <p className="landing-kicker">{landing.sections.aiKicker || LANDING_SECTION_COPY.en.aiKicker}</p>
            <h2>{landing.sections.aiTitle || LANDING_SECTION_COPY.en.aiTitle}</h2>
            <p className="landing-ai-lead">{landing.sections.aiText || LANDING_SECTION_COPY.en.aiText}</p>
            <ul className="landing-ai-points">
              {landing.aiPoints.map((point) => (
                <li key={point}>
                  <FiCheck aria-hidden="true" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="landing-loop" id="practice">
          <div className="landing-section-heading">
            <h2>{landing.sections.loopTitle}</h2>
            <span />
          </div>
          <div className="loop-steps">
            {landing.loopSteps.map(({ icon: Icon, label }, index) => (
              <React.Fragment key={label}>
                <div className="loop-step">
                  <div><Icon aria-hidden="true" /></div>
                  <strong>{label}</strong>
                </div>
                {index < landing.loopSteps.length - 1 && <FiChevronRight className="loop-arrow" aria-hidden="true" />}
              </React.Fragment>
            ))}
          </div>
        </section>

        <section className="landing-comparison">
          <div className="landing-section-heading">
            <h2>{landing.sections.comparisonTitle}</h2>
            <span />
          </div>
          <div className="comparison-table" role="table" aria-label={landing.sections.comparisonAriaLabel}>
            <div className="comparison-row comparison-head" role="row">
              <span role="columnheader">{landing.sections.comparisonHeaders[0]}</span>
              <span role="columnheader">{landing.sections.comparisonHeaders[1]}</span>
              <span role="columnheader">{landing.sections.comparisonHeaders[2]}</span>
            </div>
            {landing.comparisonRows.map(({ icon: Icon, feature, typical, lingo }) => (
              <div className="comparison-row" role="row" key={feature}>
                <strong role="cell">
                  <Icon aria-hidden="true" />
                  {feature}
                </strong>
                <span role="cell" data-label={landing.sections.comparisonHeaders[1]}>{typical}</span>
                <span role="cell" className="comparison-win">
                  <FiCheck aria-hidden="true" />
                  <span data-label={landing.sections.comparisonHeaders[2]}>{lingo}</span>
                </span>
              </div>
            ))}
          </div>
          <div className="comparison-more">
            <button type="button" onClick={viewFullComparison}>
              {landing.sections.comparisonDeepDiveCta || LANDING_SECTION_COPY.en.comparisonDeepDiveCta}
              <FiArrowRight aria-hidden="true" />
            </button>
          </div>
        </section>

        <section className="landing-testimonials" aria-label={sec('testimonialsTitle')}>
          <div className="landing-section-heading">
            <p className="landing-kicker">{sec('testimonialsKicker')}</p>
            <h2>{sec('testimonialsTitle')}</h2>
            <span />
          </div>
          <div className="testimonial-grid">
            {displayedTestimonials.map(({ id, quote, name, detail }) => (
              <figure className="testimonial-card" key={id}>
                <blockquote>{quote}</blockquote>
                <figcaption>
                  <strong>{name}</strong>
                  <small>{detail}</small>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="landing-faq" aria-label={landing.sections.faqTitle || LANDING_SECTION_COPY.en.faqTitle}>
          <div className="landing-section-heading">
            <h2>{landing.sections.faqTitle || LANDING_SECTION_COPY.en.faqTitle}</h2>
            <span />
          </div>
          <div className="faq-grid">
            {landing.faq.map(({ q, a }) => (
              <article className="faq-item" key={q}>
                <h3>{q}</h3>
                <p>{a}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="landing-cta">
          <div>
            <h2>{landing.copy.ctaTitle}</h2>
            <p>{landing.copy.ctaText}</p>
          </div>
          <div>
            <button type="button" className="landing-cta-light" onClick={startFree}>
              {landing.copy.startFree}
            </button>
            <button type="button" className="landing-cta-outline" onClick={tryGuest}>
              {landing.copy.tryGuest}
            </button>
          </div>
          <FiHeart className="cta-line-icon" aria-hidden="true" />
        </section>
      </main>
    </div>
  );
}

export default LandingPage;
