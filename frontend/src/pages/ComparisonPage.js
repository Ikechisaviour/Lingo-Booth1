import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  FiArrowRight,
  FiAward,
  FiCheck,
  FiGlobe,
  FiLayers,
} from 'react-icons/fi';
import BrandLogo from '../components/BrandLogo';
import { getPreferredPublicLanguage } from '../utils/publicLanguage';
import './ComparisonPage.css';

const COMPARISON_COPY = {
  en: {
    home: 'Home',
    features: 'Features',
    login: 'Login',
    startFree: 'Start free',
    pageTitle: 'Lingo Booth vs Other Language Learning Platforms',
    heroLead: [
      'Most language platforms are strong in one area: quick daily practice, flashcards, live tutoring, scheduled classes, or conversation exchange. Lingo Booth is built differently. It connects guided lessons, speaking practice, writing, review, real-life context, progress tracking, certificates, semester cohorts, and institution tools in one platform.',
      'Instead of making learners jump between separate tools, Lingo Booth helps them move from learning to practice to review to real-world use.',
    ],
    heroCta: 'Start learning',
    secondaryCta: 'Explore all features',
    stats: [
      { value: '20', label: 'supported languages' },
      { value: '380', label: 'native-to-target learning pairs' },
      { value: '1', label: 'connected learning platform' },
    ],
    tableTitle: 'Named platform comparison',
    tableIntro: 'This table compares Lingo Booth with well-known language platforms by name. It is written around public product positioning and broad feature coverage, not private pricing plans or temporary promotions.',
    tableHeaders: ['Platform', 'What they are known for', 'Where Lingo Booth goes further'],
    tableRows: [
      {
        feature: 'Duolingo',
        typical: 'Gamified daily practice with short lessons, streaks, leagues, reminders, broad language coverage, and quick beginner-friendly exercises.',
        lingo: 'Duolingo is great for starting out and staying consistent. Lingo Booth builds on that daily habit with a focus on actual speaking and writing, and review pulled from every activity so progress moves toward real conversations.',
      },
      {
        feature: 'Babbel',
        typical: 'Structured app lessons, practical dialogues, review, pronunciation support, and live online class options through Babbel Live.',
        lingo: 'Babbel already teaches with solid structured dialogues. Lingo Booth keeps that structure but lets you carry new language into open conversation roleplays and turn your own real-life situations into practice, rather than staying inside scripted lessons.',
      },
      {
        feature: 'Rosetta Stone',
        typical: 'Immersive lessons, speech-recognition pronunciation support, flashcards, real-world dialogue missions, tutoring, and school or enterprise offerings.',
        lingo: 'Rosetta Stone is strong, but Lingo Booth separates itself with native-language explanations, up to 380 learning pairs, real-life context-to-practice flows, deeper writing modes, weak-skill repair lessons, semester cohorts, and verifiable certificates.',
      },
      {
        feature: 'Busuu',
        typical: 'Compact expert-made lessons, community support from other learners or native speakers, pronunciation feedback, study plans, and business or educator options.',
        lingo: 'Busuu pairs structured lessons with community feedback from other learners. Lingo Booth gives always-available structured practice where lessons, writing, conversation, and review reinforce each other, so you can keep going without waiting on other people.',
      },
      {
        feature: 'Memrise',
        typical: 'Useful phrases, native-speaker videos, listening practice, smart review, speaking practice, and exam-prep positioning for some learners.',
        lingo: 'Memrise is strong for input and useful phrases. Lingo Booth connects those phrases to guided lessons, speaking roleplays, and writing, so you move from recognizing language to actually producing it.',
      },
      {
        feature: 'Lingoda',
        typical: 'Live online language classes with teachers, scheduled lessons, structured class packages, and a classroom-style learning experience.',
        lingo: 'Lingoda depends on live, scheduled classes. Lingo Booth delivers similar structure and accountability through semester cohorts and weekly goals, without needing every session to be live or booked, plus private practice you can do any time.',
      },
      {
        feature: 'Preply',
        typical: 'One-on-one tutor marketplace where learners choose tutors, book lessons, message tutors, and learn through live human instruction.',
        lingo: 'Preply connects learners with tutors for live one-on-one sessions. Lingo Booth gives always-available structured practice between or alongside those sessions, so you keep progressing without booking time.',
      },
      {
        feature: 'HelloTalk',
        typical: 'Language exchange with native speakers, chat-based practice, social discovery, friendship, and cultural conversation.',
        lingo: 'HelloTalk is about chatting with native speakers in the moment. Lingo Booth is the private space to prepare first: rehearse the exact conversation, get corrections, and save what you learn before you speak with real people.',
      },
      {
        feature: 'Tandem',
        typical: 'Language exchange partners, text chat, voice notes, audio or video calls, corrections, translation tools, and people-based conversation practice.',
        lingo: 'Tandem connects you with exchange partners for casual conversation. Lingo Booth provides the structured learning around that exchange, so you arrive prepared and turn each conversation into saved, reviewable practice.',
      },
      {
        feature: 'Pimsleur',
        typical: 'Audio-first lessons, hands-free practice, recall training, flashcards, roleplay-style transcripts, voice coaching, and broad course coverage.',
        lingo: 'Pimsleur is audio-first and strong for listening and speaking. Lingo Booth keeps speaking central while adding visual lessons, writing practice, and saved review that tracks real progress.',
      },
      {
        feature: 'Drops',
        typical: 'Fast visual vocabulary games, short daily sessions, broad language coverage, and light grammar or sentence support in selected languages.',
        lingo: 'Drops is a fast vocabulary game. Lingo Booth connects vocabulary to lessons, speaking, writing, and review, so new words get used rather than just matched.',
      },
      {
        feature: 'Mango Languages',
        typical: 'Structured language courses for individuals, libraries, schools, and organizations, with culture notes and practical conversation paths.',
        lingo: 'Mango is a solid structured course, often offered through libraries and schools. Lingo Booth adds a more connected learner loop, turning real-life situations into roleplay, writing, and review, with cohort and institution tools when an organization needs them.',
      },
      {
        feature: 'FluentU',
        typical: 'Authentic video-based language learning that helps learners hear language in context through clips, subtitles, vocabulary, and review.',
        lingo: 'FluentU centers on learning from authentic video. Lingo Booth is practice-centered, connecting lessons, speaking, writing, and review so comprehension becomes output.',
      },
      {
        feature: 'Lingopie',
        typical: 'Language learning through TV shows, movies, music videos, podcasts, short stories, audiobooks, interactive subtitles, clicked-word translations, flashcards, quizzes, and school or library options.',
        lingo: 'Lingopie is strong for video immersion and contextual listening. Lingo Booth goes further with structured lessons, speaking, writing, weak-skill repair, real-life context-to-practice, certificates, cohorts, and broader native-to-target pairing.',
      },
      {
        feature: 'Clozemaster',
        typical: 'Sentence-based cloze practice for vocabulary in context, gamified repetition, and broad language coverage.',
        lingo: 'Clozemaster drills vocabulary through fill-in-the-blank sentences. Lingo Booth surrounds that with guided lessons, speaking, and writing, so sentence practice leads somewhere.',
      },
      {
        feature: 'Anki',
        typical: 'Powerful user-made spaced-repetition flashcards that can support almost any subject or language if the learner builds or imports decks.',
        lingo: 'Anki is powerful spaced repetition centered on learner-built flashcard decks. Lingo Booth includes review and supplies the whole system around it: lessons, speaking, writing, and real-life context.',
      },
      {
        feature: 'Quizlet',
        typical: 'Study sets, flashcards, practice tests, matching games, and user-created study material across many subjects, including language learning.',
        lingo: 'Quizlet is a general study-set tool used across many subjects. Lingo Booth is purpose-built for languages, so review connects directly to speaking, writing, lessons, and real-life practice.',
      },
      {
        feature: 'Rocket Languages',
        typical: 'Structured online language courses with voice recognition, native-speaker audio, speaking practice, flashcards, tests, culture lessons, and lifetime course access.',
        lingo: 'Rocket Languages is a strong course product. Lingo Booth goes further by connecting course work to custom roleplays, personal real-life context, writing modes, cohort structure, verifiable certificates, and institution status views.',
      },
      {
        feature: 'LingoDeer',
        typical: 'Grammar-based lessons, detailed explanations, native-speaker audio, stories, flashcards, weak-area review, and a strong reputation for Asian-language learning.',
        lingo: 'LingoDeer is strong for structured grammar study. Lingo Booth adds broader connected practice: conversation, writing, quizzes, saved review, real-life context conversion, certificates, cohorts, and institution tools.',
      },
      {
        feature: 'LingQ',
        typical: 'Reading and listening through real-world content, imported lessons, vocabulary tracking, saved words, progress stats, and a large library across many languages.',
        lingo: 'LingQ is excellent for input and content immersion. Lingo Booth adds a fuller output system where lessons, speaking, writing, review, and personal situations turn into guided practice.',
      },
      {
        feature: 'Lingvist',
        typical: 'Adaptive vocabulary learning with placement, spaced repetition, custom decks, common-word prioritization, progress monitoring, and classroom or business options.',
        lingo: 'Lingvist is efficient for vocabulary growth. Lingo Booth covers more of the full language-learning loop: guided lessons, conversation, writing, certificates, real-life roleplay, and semester accountability.',
      },
      {
        feature: 'Beelinguapp',
        typical: 'Parallel-text reading, audiobooks, native-language translations, stories, news, music, quizzes, glossary saving, flashcards, and mobile reading practice.',
        lingo: 'Beelinguapp is strong for reading and listening in parallel texts. Lingo Booth adds structured lessons, speaking, writing, weak-skill repair, review from all activities, cohorts, and certificates.',
      },
      {
        feature: 'Yabla',
        typical: 'Authentic videos with dual-language subtitles, clickable dictionaries, playback controls, dictation, listening games, speaking activities, and school subscriptions.',
        lingo: 'Yabla is strong for video immersion. Lingo Booth goes beyond watching and reviewing by connecting language to guided lessons, roleplays, writing, saved items, repair lessons, and institution progress.',
      },
      {
        feature: 'ELSA Speak',
        typical: 'English speaking and pronunciation practice with personalized feedback, real-world roleplays, progress dashboards, quick evaluation, and school or business solutions.',
        lingo: 'ELSA Speak is specialized for English speaking. Lingo Booth is broader across 20 languages and connects speaking to lessons, writing, review, certificates, real-life context, and cohorts.',
      },
      {
        feature: 'Speak',
        typical: 'Speaking-first lessons with expert-crafted phrase patterns, repeated practice, back-and-forth conversation practice, feedback, and selected supported target languages.',
        lingo: 'Speak is strong for spoken output. Lingo Booth adds a wider platform around that output: multi-skill lessons, writing, review, certificates, institution tools, and any supported native-to-target pairing.',
      },
      {
        feature: 'MosaLingua',
        typical: 'Practical vocabulary and phrase learning using a cognitive-science-based method, flashcards, listening, reading, speaking support, and several focused language courses.',
        lingo: 'MosaLingua is useful for practical phrase retention. Lingo Booth turns retention into a connected system with lessons, speaking, writing, real-life scenarios, weak-skill repair, certificates, and cohorts.',
      },
      {
        feature: 'Lingo Booth',
        typical: 'A connected international language-learning platform with guided lessons, speaking, writing, flashcards, quizzes, review, real-life context practice, certificates, cohorts, and institution tools.',
        lingo: 'Best fit when a learner or organization wants one platform that connects lessons, practice, review, and real-world use instead of stitching together several separate tools.',
      },
    ],
    featureMatrixTitle: 'Detailed feature matrix by platform',
    featureMatrixIntro: 'This matrix gives the comparison more room. Yes means the feature appears to be a clear core capability, Partial means the platform has some related support, x means we are not aware of it as a core feature, and Coming means the feature is planned or being introduced. Entries reflect publicly available information as of June 2026 and may be out of date.',
    featureMatrixHeaders: ['Platform', 'Guided lessons', 'Native-language guidance', 'Gamified motivation', 'Speaking practice', 'Live human practice', 'Custom roleplays', 'Deep writing modes', 'Quizzes / checkpoints', 'Flashcards / review', 'Review from every activity', 'User-created saved items', 'Real-life context', 'Context-to-practice loop', 'Weak-skill repair', 'Skill progress', 'Placement / level checks', 'Exam-ready principles', 'Verifiable certificates', 'Semester cohorts', 'Institution admin', 'Any native-to-target pairing'],
    featureMatrixRows: [
      { platform: 'Duolingo', cells: ['Yes', 'Partial', 'Yes', 'Partial', 'x', 'Partial', 'x', 'Partial', 'Yes', 'Partial', 'x', 'Partial', 'x', 'Partial', 'Partial', 'x', 'x', 'Partial', 'x', 'Partial', 'x'] },
      { platform: 'Babbel', cells: ['Yes', 'Yes', 'Partial', 'Yes', 'Yes', 'Partial', 'Partial', 'Partial', 'Yes', 'Partial', 'x', 'Partial', 'x', 'Partial', 'Partial', 'Partial', 'Partial', 'x', 'Partial', 'Yes', 'x'] },
      { platform: 'Rosetta Stone', cells: ['Yes', 'x', 'Partial', 'Yes', 'Yes', 'Partial', 'Partial', 'Partial', 'Yes', 'Partial', 'Partial', 'Partial', 'x', 'Partial', 'Partial', 'x', 'x', 'x', 'x', 'Yes', 'x'] },
      { platform: 'Busuu', cells: ['Yes', 'Yes', 'Partial', 'Yes', 'Partial', 'x', 'Partial', 'Yes', 'Yes', 'Partial', 'Partial', 'Partial', 'x', 'Partial', 'Yes', 'Yes', 'Partial', 'Yes', 'x', 'Yes', 'x'] },
      { platform: 'Memrise', cells: ['Partial', 'Partial', 'Partial', 'Yes', 'x', 'Yes', 'x', 'Partial', 'Yes', 'Partial', 'Partial', 'Yes', 'Partial', 'Partial', 'Partial', 'x', 'Partial', 'Partial', 'x', 'x', 'x'] },
      { platform: 'Lingoda', cells: ['Yes', 'Yes', 'x', 'Yes', 'Yes', 'Partial', 'Partial', 'Partial', 'Partial', 'Partial', 'x', 'Partial', 'x', 'Partial', 'Partial', 'Partial', 'Partial', 'Partial', 'Partial', 'Yes', 'x'] },
      { platform: 'Preply', cells: ['Tutor-led', 'Tutor-led', 'x', 'Yes', 'Yes', 'Tutor-led', 'Tutor-led', 'Tutor-led', 'Tutor-led', 'Partial', 'x', 'Tutor-led', 'x', 'Tutor-led', 'Partial', 'Partial', 'Tutor-led', 'x', 'Business', 'Yes', 'x'] },
      { platform: 'HelloTalk', cells: ['x', 'Partial', 'x', 'Yes', 'Yes', 'x', 'Chat', 'x', 'x', 'x', 'Partial', 'Yes', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'] },
      { platform: 'Tandem', cells: ['x', 'Partial', 'x', 'Yes', 'Yes', 'x', 'Chat', 'x', 'x', 'x', 'Partial', 'Yes', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'] },
      { platform: 'Pimsleur', cells: ['Yes', 'Partial', 'Partial', 'Yes', 'x', 'Partial', 'Partial', 'Partial', 'Yes', 'Partial', 'x', 'Partial', 'x', 'Partial', 'Partial', 'x', 'Partial', 'Yes', 'x', 'Partial', 'x'] },
      { platform: 'Drops', cells: ['Partial', 'Partial', 'Yes', 'Partial', 'x', 'x', 'x', 'Partial', 'Partial', 'x', 'x', 'Partial', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'] },
      { platform: 'Mango Languages', cells: ['Yes', 'Yes', 'Partial', 'Partial', 'x', 'Partial', 'Partial', 'Partial', 'Partial', 'Partial', 'x', 'Partial', 'x', 'Partial', 'Partial', 'x', 'Partial', 'x', 'x', 'Yes', 'x'] },
      { platform: 'FluentU', cells: ['Partial', 'Partial', 'Partial', 'Partial', 'x', 'x', 'Partial', 'Partial', 'Partial', 'Partial', 'Partial', 'Yes', 'x', 'x', 'Partial', 'x', 'x', 'x', 'x', 'x', 'x'] },
      { platform: 'Lingopie', cells: ['Partial', 'Partial', 'Partial', 'Partial', 'Yes', 'x', 'x', 'Yes', 'Yes', 'Partial', 'Partial', 'Yes', 'Partial', 'x', 'Yes', 'x', 'x', 'x', 'x', 'Partial', 'x'] },
      { platform: 'Clozemaster', cells: ['Partial', 'Partial', 'Yes', 'x', 'x', 'x', 'x', 'Partial', 'Yes', 'Partial', 'x', 'Partial', 'x', 'x', 'Partial', 'x', 'x', 'x', 'x', 'x', 'x'] },
      { platform: 'Anki', cells: ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'Yes', 'x', 'User-made', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'Any deck'] },
      { platform: 'Quizlet', cells: ['x', 'Partial', 'Partial', 'x', 'x', 'x', 'x', 'Yes', 'Yes', 'Partial', 'User-made', 'User-made', 'x', 'x', 'Partial', 'Partial', 'x', 'x', 'x', 'Partial', 'Any deck'] },
      { platform: 'Rocket Languages', cells: ['Yes', 'Partial', 'Partial', 'Yes', 'x', 'Partial', 'Partial', 'Yes', 'Yes', 'Partial', 'Yes', 'Partial', 'x', 'Partial', 'Partial', 'x', 'Partial', 'x', 'x', 'x', 'x'] },
      { platform: 'LingoDeer', cells: ['Yes', 'Yes', 'Partial', 'Partial', 'x', 'x', 'Partial', 'Yes', 'Yes', 'Partial', 'x', 'Partial', 'x', 'Yes', 'Partial', 'x', 'Partial', 'x', 'x', 'Partial', 'x'] },
      { platform: 'LingQ', cells: ['Partial', 'Partial', 'Partial', 'x', 'x', 'x', 'x', 'Partial', 'Yes', 'Yes', 'Yes', 'Yes', 'Partial', 'Partial', 'Yes', 'Partial', 'x', 'x', 'x', 'Partial', 'Partial'] },
      { platform: 'Lingvist', cells: ['Partial', 'Partial', 'Partial', 'x', 'x', 'x', 'x', 'Yes', 'Yes', 'Partial', 'Yes', 'Partial', 'Partial', 'Yes', 'Yes', 'Yes', 'x', 'x', 'x', 'Yes', 'x'] },
      { platform: 'Beelinguapp', cells: ['Partial', 'Yes', 'Partial', 'x', 'x', 'x', 'x', 'Yes', 'Yes', 'Partial', 'Yes', 'Yes', 'x', 'x', 'Partial', 'x', 'x', 'x', 'x', 'Partial', 'x'] },
      { platform: 'Yabla', cells: ['Partial', 'Yes', 'Partial', 'Yes', 'x', 'x', 'Partial', 'Yes', 'Yes', 'Partial', 'Yes', 'Yes', 'x', 'Partial', 'Partial', 'x', 'x', 'x', 'x', 'Yes', 'x'] },
      { platform: 'ELSA Speak', cells: ['Yes', 'Yes', 'Partial', 'Yes', 'x', 'Yes', 'x', 'Partial', 'Partial', 'Partial', 'x', 'Yes', 'Partial', 'Yes', 'Yes', 'Yes', 'Yes', 'x', 'x', 'Yes', 'x'] },
      { platform: 'Speak', cells: ['Yes', 'Partial', 'Partial', 'Yes', 'x', 'Yes', 'x', 'Partial', 'Partial', 'Partial', 'x', 'Yes', 'Partial', 'Partial', 'Partial', 'x', 'x', 'x', 'x', 'Yes', 'x'] },
      { platform: 'MosaLingua', cells: ['Partial', 'Yes', 'Partial', 'Partial', 'x', 'x', 'x', 'Yes', 'Yes', 'Partial', 'Partial', 'Partial', 'x', 'Partial', 'Partial', 'Partial', 'Partial', 'x', 'x', 'Partial', 'x'] },
      { platform: 'Lingo Booth', cells: ['Yes', 'Yes', 'Yes', 'Yes', 'x', 'Yes', 'Yes', 'Yes', 'Yes', 'Yes', 'Yes', 'Yes', 'Yes', 'Yes', 'Yes', 'Yes', 'Yes', 'Yes', 'Yes', 'Yes', 'Yes'] },
    ],
    chooseTitle: 'Choose Lingo Booth if you want',
    chooseItems: [
      'A structured language-learning path instead of random practice always.',
      'Lessons, speaking, writing, flashcards, review, quizzes, and progress in one connected platform.',
      'Real-life situations turned into personal language practice.',
      'Support for English, Korean, Spanish, French, German, Chinese, Japanese, Hindi, Arabic, Hebrew, Portuguese, Italian, Dutch, Russian, Indonesian, Malay, Filipino, Turkish, Bengali, and Tamil.',
      'Up to 380 native-to-target learning pairs across 20 supported languages.',
      'Language principles that build real fluency and exam-ready confidence.',
      'Semester cohorts with weekly goals, completion tracking, and certificates.',
      'Institution tools for schools, universities, teams, and organizations.',
      'Accountability without exposing every learner mistake or private practice detail.',
    ],
    differentTitle: 'The Lingo Booth difference',
    differentItems: [
      { term: 'Connected learning loop', description: 'A lesson can become a saved item, a review card, a writing prompt, a quiz item, or a conversation practice target, so learning compounds instead of restarting in every tool.' },
      { term: 'Real-life context becomes practice', description: 'Learners can bring in personal situations from work, school, travel, family, or daily life and turn them into focused vocabulary, roleplay, review, and writing practice.' },
      { term: 'International-first structure', description: 'The platform is designed for many native languages and many target languages, not only for English speakers learning one popular language.' },
      { term: 'Private progress with group accountability', description: 'Learners can participate in groups, semesters, and institutions while keeping detailed corrections, mistakes, and personal practice history private.' },
    ],
    disclaimer: 'This comparison reflects our understanding of each platform’s publicly available product positioning as of June 2026, not private pricing plans or temporary promotions. Platforms add, remove, and change features over time, so specific details may be out of date. If you believe anything here is inaccurate, please contact us and we will review it.',
    trademarkNotice: 'All product names, logos, and brands are the property of their respective owners. Naming them here is for identification and comparison only and does not imply any affiliation with, endorsement by, or partnership with those companies. Lingo Booth is not affiliated with any of the platforms named on this page.',
    closingTitle: 'One platform for structured practice, real-world use, and serious progress.',
    ctaStartLearning: 'Start Learning',
    ctaExploreFeatures: 'Explore Features',
    ctaInstitutionPlans: 'Explore Institution Plans',
  },
};

function ComparisonPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const lang = getPreferredPublicLanguage();
  const copy = COMPARISON_COPY[lang] || COMPARISON_COPY.en;

  const startLearning = () => navigate('/select-language?mode=register');
  const exploreFeatures = () => navigate('/features');
  const institutionPlans = () => navigate('/contact');
  const lingoBoothMatrixRow = copy.featureMatrixRows.find((row) => row.platform === 'Lingo Booth');
  const comparisonMatrixRows = copy.featureMatrixRows.filter((row) => row.platform !== 'Lingo Booth');

  const renderMatrixCells = (row) => (
    <>
      {row.cells.map((cell, index) => {
        const value = String(cell);
        const valueKey = value.trim().toLowerCase();
        const cellClass = [
          'comparison-matrix-cell',
          valueKey === 'x' ? 'comparison-matrix-cell--no' : '',
          valueKey === 'coming' ? 'comparison-matrix-cell--planned' : '',
        ].filter(Boolean).join(' ');
        return (
          <td className={cellClass} key={`${row.platform}-${copy.featureMatrixHeaders[index + 1]}`}>
            {value}
          </td>
        );
      })}
    </>
  );

  return (
    <div className="comparison-page">
      <header className="comparison-nav">
        <button
          type="button"
          className="comparison-brand"
          onClick={() => navigate('/')}
          aria-label={t('common.backToHome', 'Back to home')}
        >
          <BrandLogo variant="lockup" decorative />
        </button>
        <div className="comparison-nav-actions">
          <button type="button" className="comparison-nav-link" onClick={() => navigate('/')}>
            {copy.home}
          </button>
          <button type="button" className="comparison-nav-link" onClick={exploreFeatures}>
            {copy.features}
          </button>
          <button type="button" className="comparison-nav-link" onClick={() => navigate('/login')}>
            {copy.login}
          </button>
          <button type="button" className="comparison-primary comparison-primary-small" onClick={startLearning}>
            {copy.startFree}
          </button>
        </div>
      </header>

      <main>
        <section className="comparison-hero">
          <div>
            <p className="comparison-kicker">{copy.tableTitle}</p>
            <h1>{copy.pageTitle}</h1>
            {copy.heroLead.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <div className="comparison-hero-actions">
              <button type="button" className="comparison-primary" onClick={startLearning}>
                {copy.heroCta}
              </button>
              <button type="button" className="comparison-secondary" onClick={exploreFeatures}>
                {copy.secondaryCta}
              </button>
            </div>
          </div>
          <div className="comparison-stat-stack" aria-label={copy.pageTitle}>
            {copy.stats.map((stat) => (
              <div className="comparison-stat" key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="comparison-block">
          <div className="comparison-block-head">
            <span className="comparison-block-icon" aria-hidden="true">
              <FiAward />
            </span>
            <h2>{copy.featureMatrixTitle}</h2>
          </div>
          <p className="comparison-block-intro">{copy.featureMatrixIntro}</p>
          <div className="comparison-matrix-wrap">
            <table className="comparison-matrix">
              <thead>
                <tr>
                  {copy.featureMatrixHeaders.map((header) => (
                    <th key={header}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonMatrixRows.map((row) => (
                  <tr key={row.platform}>
                    <th scope="row">{row.platform}</th>
                    {renderMatrixCells(row)}
                  </tr>
                ))}
              </tbody>
              {lingoBoothMatrixRow ? (
                <tfoot>
                  <tr className="comparison-matrix-win">
                    <th scope="row">{lingoBoothMatrixRow.platform}</th>
                    {renderMatrixCells(lingoBoothMatrixRow)}
                  </tr>
                </tfoot>
              ) : null}
            </table>
          </div>
        </section>

        <section className="comparison-block">
          <div className="comparison-block-head">
            <span className="comparison-block-icon" aria-hidden="true">
              <FiLayers />
            </span>
            <h2>{copy.tableTitle}</h2>
          </div>
          <p className="comparison-block-intro">{copy.tableIntro}</p>
          <div className="comparison-table" role="table" aria-label={copy.tableTitle}>
            <div className="comparison-table-row comparison-table-row--head" role="row">
              {copy.tableHeaders.map((header) => (
                <span role="columnheader" key={header}>{header}</span>
              ))}
            </div>
            {copy.tableRows.map((row) => (
              <div className="comparison-table-row" role="row" key={row.feature}>
                <strong role="cell" data-label={copy.tableHeaders[0]}>
                  {row.feature}
                </strong>
                <span role="cell" data-label={copy.tableHeaders[1]}>{row.typical}</span>
                <span role="cell" className="comparison-win" data-label={copy.tableHeaders[2]}>
                  <FiCheck aria-hidden="true" />
                  {row.lingo}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="comparison-split">
          <div className="comparison-block comparison-block--flush">
            <div className="comparison-block-head">
              <span className="comparison-block-icon" aria-hidden="true">
                <FiCheck />
              </span>
              <h2>{copy.chooseTitle}</h2>
            </div>
            <ul className="comparison-check-list">
              {copy.chooseItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="comparison-block comparison-block--flush">
            <div className="comparison-block-head">
              <span className="comparison-block-icon" aria-hidden="true">
                <FiGlobe />
              </span>
              <h2>{copy.differentTitle}</h2>
            </div>
            <ul className="comparison-difference-list">
              {copy.differentItems.map((item) => (
                <li key={item.term}>
                  <span>{item.term}</span>
                  <p>{item.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <p className="comparison-disclaimer">{copy.disclaimer}</p>
        <p className="comparison-disclaimer comparison-trademark">{copy.trademarkNotice}</p>

        <section className="comparison-cta">
          <h2>{copy.closingTitle}</h2>
          <div className="comparison-cta-actions">
            <button type="button" className="comparison-cta-light" onClick={startLearning}>
              {copy.ctaStartLearning}
            </button>
            <button type="button" className="comparison-cta-outline" onClick={exploreFeatures}>
              {copy.ctaExploreFeatures}
            </button>
            <button type="button" className="comparison-cta-outline" onClick={institutionPlans}>
              {copy.ctaInstitutionPlans}
            </button>
          </div>
          <FiArrowRight className="comparison-cta-icon" aria-hidden="true" />
        </section>
      </main>
    </div>
  );
}

export default ComparisonPage;
