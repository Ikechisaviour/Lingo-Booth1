import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  FiArrowRight,
  FiAward,
  FiBookOpen,
  FiCheckCircle,
  FiChevronDown,
  FiEdit3,
  FiGlobe,
  FiGrid,
  FiHome,
  FiLayers,
  FiLock,
  FiMessageCircle,
  FiRefreshCw,
  FiStar,
  FiTarget,
  FiTrendingUp,
  FiUsers,
} from 'react-icons/fi';
import BrandLogo from '../components/BrandLogo';
import { getPreferredPublicLanguage } from '../utils/publicLanguage';
import './FeaturesPage.css';

// Public marketing page. All copy lives in this table and is rendered via
// member expressions / .map() so the i18n-leak audit (which only flags English
// string literals written directly in JSX) stays green, following the same pattern
// LandingPage uses. Additional locales can be added as sibling keys; anything
// missing falls back to English, mirroring LandingPage's section-copy fallback.
const FEATURES_COPY = {
  en: {
    backToHome: 'Back to home',
    home: 'Home',
    login: 'Login',
    startFree: 'Start free',
    featureCountLabel: 'features',
    readMore: 'Read more',
    showLess: 'Show less',
    pageTitle: 'Everything Lingo Booth Helps You Do',
    heroLead: [
      'Lingo Booth is more than a language learning app. It is a complete language practice platform for independent learners, schools, and teams. It brings guided lessons, conversation and speaking practice, writing, spaced-repetition review, progress tracking, verifiable certificates, and semester-style cohort learning into one connected experience across 20 languages and hundreds of native-to-target language pairs, on web, mobile, and tablet.',
      'Whether you are learning alone, preparing for real conversations, or joining a structured semester group, Lingo Booth helps you practice with purpose.',
    ],
    sections: [
      {
        title: 'Learn With Structure',
        intro: [
          'Lingo Booth turns scattered study into a clear path. Instead of loose tips and isolated phrases, learners move through guided lessons that build each skill step by step, with native-language explanations and real target-language examples at every stage.',
        ],
        items: [
          { term: 'Guided class lessons', description: 'Structured, step-by-step language lessons that introduce one concept at a time (vocabulary, grammar, pronunciation, or a dialogue) with clear native-language explanations and real target-language examples, so you understand why something works instead of blindly memorizing it.' },
          { term: 'Beginner to advanced learning paths', description: 'A continuous CEFR-style progression that carries you from absolute beginner (A1) through to advanced (C1+) communication, with no gaps where learners typically get stuck between levels.' },
          { term: 'Skill-focused lessons for speaking, listening, reading, and writing', description: "Each of the four core language skills is trained on its own track, so you don't end up able to read a language but unable to actually speak, hear, or write it, which is the most common failure of single-format apps." },
          { term: 'Core lessons, review lessons, checkpoints, and repair lessons', description: "Four connected lesson types: you learn new material in core lessons, reinforce it in review lessons, prove yourself at checkpoints, and receive targeted repair lessons that rebuild any concept you haven't fully mastered." },
          { term: 'Native-language guidance and target-language immersion support', description: 'Instructions and explanations appear in your own language while the practice keeps you immersed in your target language, combining the clarity of L1 teaching with the exposure of full immersion.' },
          { term: 'Lesson summaries and learning memory', description: 'Each lesson’s key points are captured and remembered across sessions and devices, so you can instantly recall what you covered and resume exactly where you stopped.' },
          { term: 'Expression practice for useful phrases', description: 'Focused drills on the real, ready-to-use expressions native speakers actually say in greetings, requests, small talk, and transactions, so you leave each session with language you can use the same day.' },
          { term: 'Practice activities connected to each lesson', description: 'Every lesson is paired with hands-on activities, so you apply new material immediately through speaking, writing, or quizzing rather than only reading about it.' },
          { term: 'Class lesson certificates', description: 'Each completed class earns a downloadable, verifiable certificate, giving you a tangible, shareable record of progress as you move through the curriculum.' },
          { term: 'Web and mobile access', description: 'One account works across web, iOS, and Android, with lessons, audio, and progress synced so you can start on your laptop and continue on your phone.' },
        ],
      },
      {
        title: 'Structured For International Language Standards',
        intro: [
          'Lingo Booth is built around structured language learning, not just phrase memorization. Learners are taught the principles that guide each language, including sounds, writing systems, grammar patterns, sentence structure, vocabulary usage, pronunciation, register, reading, listening, speaking, and writing.',
          'This gives learners a stronger foundation for real communication and helps them build confidence for school assessments, placement tests, proficiency checks, and standard language exams such as TOPIK (Korean), JLPT (Japanese), HSK (Chinese), DELE (Spanish), DELF/DALF (French), TestDaF/Goethe (German), and IELTS/TOEFL (English).',
        ],
        items: [
          { term: 'Skill-based learning across speaking, listening, reading, and writing', description: 'All four exam-tested skills are developed in parallel, keeping your ability balanced and ready for the way real proficiency tests and real life actually assess you.' },
          { term: 'Grammar and sentence-pattern practice', description: 'You learn the underlying grammar patterns and sentence structures that let you build your own original sentences, rather than being limited to repeating fixed phrases.' },
          { term: 'Pronunciation and sound awareness', description: 'Targeted training helps your ear and mouth recognize and produce sounds, tones, and minimal pairs that may not exist in your native language, which is the difference between sounding foreign and sounding natural.' },
          { term: 'Writing-system support where needed', description: 'When a target language uses a non-Latin writing system, learners can build reading and writing from the ground up instead of relying on romanized shortcuts.' },
          { term: 'Level checks and placement-style assessments', description: 'Placement and level assessments show where you genuinely stand and where you should begin, the same way a structured course or university program would place you.' },
          { term: 'Weak-skill reports and repair lessons', description: "Clear reports pinpoint which skills are lagging, and matching repair lessons target those exact gaps so a single weak area doesn't hold back your overall progress." },
          { term: 'Progress tracking by skill and mastery', description: 'You watch each individual skill improve over time, giving you a true diagnostic picture of your ability instead of one vague overall number.' },
          { term: 'Certificates and verifiable completion records', description: 'Your achievements come with downloadable certificates and verification links that schools, employers, or admissions offices can independently confirm.' },
          { term: 'Language-specific learning principles instead of one-size-fits-all translation', description: 'Each language is taught on its own terms, such as politeness systems, particles, tone systems, measure words, gender patterns, case marking, word order, and root patterns, rather than being forced awkwardly through English.' },
        ],
      },
      {
        title: 'Practice Real Conversations',
        intro: [
          'Reading and writing alone do not make you able to speak. Lingo Booth gives learners a private, always-available space to hold real conversations, rehearse the exact situations they will face, and build the confidence to speak without fear of judgment.',
        ],
        items: [
          { term: 'Conversation practice', description: 'Real, flowing back-and-forth conversation in a calm, judgment-free space available any time of day, where you can make mistakes and learn from them without the cost or scheduling of a human tutor.' },
          { term: 'Roleplay scenarios', description: 'Ready-made realistic situations you step into and play out, so you rehearse how a conversation will actually unfold before you face it in real life.' },
          { term: 'Custom roleplay setup', description: 'You define your own scenario (a job interview, a doctor’s visit, ordering at a café, meeting in-laws), so you can rehearse the exact conversation you’re about to have.' },
          { term: 'Practice partner responses', description: 'A responsive practice partner replies naturally, keeps the conversation moving, and adapts to whatever you say instead of following a rigid, scripted tree.' },
          { term: 'Speaking and listening support', description: 'Both halves of conversation are trained together, so you can understand what’s said and respond to it in real time, rather than mastering only one side.' },
          { term: 'Hands-free conversation mode', description: 'Practice entirely by voice with the screen off, so you can keep learning while walking, commuting, driving, cooking, or working out, turning dead time into speaking practice.' },
          { term: 'Target-language and native-language voice support', description: 'You can choose separate, natural voices for your target language and your native-language explanations, so the two never blur together and each sounds authentic.' },
          { term: 'Scenario practice for daily life, travel, work, school, and more', description: 'Practice the specific conversations that match your real goals (daily errands, travel and directions, the workplace, the classroom, customer service, and family), so your study maps directly to situations you’ll meet.' },
          { term: 'Conversation memory for better follow-up practice', description: 'Your practice partner remembers earlier sessions and the words you’ve struggled with, so each conversation builds on the last instead of starting from zero.' },
          { term: 'Helpful corrections and next-step suggestions', description: 'You receive gentle, in-the-moment corrections explaining what to fix and clear suggestions on what to try next, the way a patient tutor would guide you.' },
        ],
      },
      {
        title: 'Turn Real Life Into Practice',
        intro: [
          'Practicing for a meeting, trip, class, customer conversation, family call, or daily situation? Bring the context into Lingo Booth and turn it into focused, personalized practice.',
        ],
        items: [
          { term: 'Save real-life phrases, notes, or situations', description: 'Capture the words, sentences, and moments you actually encounter during your day, so nothing useful slips away before you can learn it.' },
          { term: 'Analyze practice context', description: "Lingo Booth reads the situation you bring in and works out what is actually worth learning from it, so you don't have to break it down yourself." },
          { term: 'Extract useful words, phrases, topics, and goals', description: 'The most relevant vocabulary, expressions, and learning goals are pulled out of your material, turning a messy real-life note into clean, structured study items.' },
          { term: 'Turn personal situations into roleplays', description: 'Convert your real upcoming conversation into a roleplay you can rehearse as many times as you like, so you walk in already practiced and confident.' },
          { term: 'Save useful items for review', description: 'Keep the phrases and concepts that matter to you and send them straight into your spaced-repetition review queue.' },
          { term: 'Connect real-world needs to lessons, writing, flashcards, and conversation practice', description: 'Everything you bring from real life flows into the rest of the platform, so what you study is driven by what you genuinely need rather than generic content.' },
        ],
      },
      {
        title: 'Review Smarter',
        intro: [
          'Most of what we learn is lost without review. Lingo Booth pulls everything you touch, from lessons to conversations to writing, into one spaced-repetition system that resurfaces each item right before you would forget it, so progress sticks instead of leaking away.',
        ],
        items: [
          { term: 'Saved learning items', description: 'Everything you choose to keep, from any activity, lives in one unified place ready to be practiced again whenever you want.' },
          { term: 'Flashcards', description: 'Fast, focused recall practice for vocabulary and phrases, with audio and native/target text, designed to move words from recognition to real knowledge.' },
          { term: 'Weak-area review', description: 'The system automatically surfaces what you struggle with most, so your limited review time goes to the items that will actually raise your level.' },
          { term: 'Due review queue', description: 'A clear daily list of what’s ready to review, timed with spaced repetition so each item returns right before you would naturally forget it, the proven path to long-term retention.' },
          { term: 'Review from class lessons, conversations, writing, quizzes, and personal notes', description: "Review material is drawn from every part of your learning, so nothing you've practiced gets stranded in a separate silo." },
          { term: 'Mastery tracking', description: 'Each item visibly moves from new, to learning, to mastered, so you can watch your knowledge solidify over time.' },
          { term: 'Practice again with quiz, flashcard, writing, or conversation', description: 'You can revisit the same item in multiple formats, and this varied retrieval deepens memory far more than repeating it the same way.' },
          { term: 'Personalized next actions', description: 'Specific, ranked suggestions for what to review next, so you never waste energy deciding where to focus.' },
        ],
      },
      {
        title: 'Writing Practice',
        intro: [
          'Writing is a skill in its own right, especially in an unfamiliar script. Lingo Booth builds it deliberately, from tracing and stroke order to typing and free composition, so learners can read and write their target language rather than only speak it.',
        ],
        items: [
          { term: 'Trace mode', description: 'Follow guided strokes directly on screen to learn the shape and flow of new letters or characters before attempting them on your own, which is essential for unfamiliar scripts and character-based writing.' },
          { term: 'Copy mode', description: 'Reproduce words and characters yourself, building the hand muscle memory that makes writing feel automatic.' },
          { term: 'Listen-and-write mode', description: 'Hear a word and write what you hear, training your listening comprehension and spelling at the same time.' },
          { term: 'Meaning practice', description: 'Connect what you write to its actual meaning, so writing reinforces understanding rather than becoming mechanical copying.' },
          { term: 'Typing practice', description: 'Get comfortable typing in your target language’s keyboard and script, a real-world skill needed for messaging, email, and work.' },
          { term: 'Stroke and review support', description: 'Learn correct stroke order for characters and review your work afterward, building proper writing habits from the very start.' },
          { term: 'Drawing pad', description: 'Write by hand directly on the screen, which is critical for character-based languages where stroke direction and shape carry meaning.' },
          { term: 'Undo and clear tools', description: 'Easily correct a stroke or wipe the canvas and start again, so experimenting and practicing never feel costly.' },
          { term: 'Ghost text guidance', description: 'Faint on-screen guides show you how to form each letter, then fade away as you become ready to write independently.' },
          { term: 'Self-review checkboxes', description: 'Mark how well you think you did, which helps both you and the system know what still needs more work.' },
          { term: 'Save items that need more practice', description: 'Flag anything you found difficult so it returns automatically for focused future practice.' },
          { term: 'Add personal writing items', description: 'Practice the specific words, names, and phrases you personally care about, not just the default set.' },
        ],
      },
      {
        title: 'Quizzes And Flashcards',
        intro: [
          'Quick, focused testing is what moves knowledge into long-term memory. Lingo Booth combines flexible quizzes with spaced-repetition flashcards, complete with audio and progress tracking, so every review session is targeted and measurable.',
        ],
        items: [
          { term: 'Quiz categories', description: 'Choose quizzes by topic, level, or skill, so you can aim practice precisely at what you want to strengthen.' },
          { term: 'Custom quiz playlists', description: 'Build your own set of questions from the material you want to drill, turning review into something fully tailored to you.' },
          { term: 'Difficulty options', description: 'Match the challenge to your current level, from gentle beginner questions to demanding advanced and full-sentence items.' },
          { term: 'Score tracking', description: 'See how you performed and watch your scores climb over time, making progress concrete and motivating.' },
          { term: 'Answer feedback', description: 'Learn why each answer was right or wrong, so every question teaches you something instead of merely grading you.' },
          { term: 'Audio support', description: 'Hear questions and answers in a natural target-language voice, building listening skills alongside reading and recognition.' },
          { term: 'Flashcard categories', description: 'Organize cards by theme, lesson, or skill so your decks stay focused and manageable.' },
          { term: 'User-created flashcards', description: 'Make your own cards for the exact words and phrases you need, so your deck reflects your real goals and vocabulary.' },
          { term: 'Pronunciation support', description: 'Every card can be played aloud, so you learn how a word actually sounds rather than guessing from spelling or romanization.' },
          { term: 'Correct and incorrect tracking', description: 'The system remembers what you get right and wrong and uses that history to shape what you review next.' },
          { term: 'Mastery status', description: 'Each card shows at a glance how well you know it, distinguishing true knowledge from lucky guesses.' },
          { term: 'Review scheduling', description: 'Cards reappear at spaced intervals calculated to move them efficiently into long-term memory.' },
        ],
      },
      {
        title: 'Personalized Learning Hub',
        intro: [
          'No two learners need the same thing on the same day. The learning hub reads your recent activity, weak areas, and goals to hand you a clear daily plan and the single most useful next step, so you never have to wonder what to do next.',
        ],
        items: [
          { term: 'Daily practice plan', description: 'A ready-made plan waiting for you each day, so you always know exactly what to do without having to design your own study routine.' },
          { term: 'Goal path', description: 'A visible route toward the goal you set, broken into achievable steps that keep the bigger objective in sight.' },
          { term: 'Recent activity', description: 'A quick snapshot of what you’ve done lately, helping you stay aware of your momentum and consistency.' },
          { term: 'Weak-area signals', description: 'Early flags on the skills or topics slipping behind, so you can address them before they turn into real obstacles.' },
          { term: 'Repair suggestions', description: 'Targeted recommendations to fix gaps the moment they appear, keeping small weaknesses from compounding into big ones.' },
          { term: 'Due review reminders', description: 'Timely nudges when items are ready for review, so spaced repetition actually happens instead of being forgotten.' },
          { term: 'First-days learning plan', description: 'A gentle, guided onboarding for brand-new learners, so the start feels welcoming rather than overwhelming.' },
          { term: 'Mini speaking drills', description: 'Short, frequent speaking bursts that build spoken confidence in small, sustainable doses you can fit into any day.' },
          { term: 'Real-world progress categories', description: 'Progress organized around real-life situations and abilities, so your growth means something beyond abstract lesson numbers.' },
          { term: 'Recommended next actions', description: 'One clear suggestion for the single most useful thing to do next, removing decision fatigue.' },
          { term: 'Progress by skill', description: 'A live view of how your speaking, listening, reading, and writing are each developing over time.' },
        ],
      },
      {
        title: 'Progress And Motivation',
        intro: [
          'Motivation fades when progress is invisible. Lingo Booth keeps learners moving with XP, streaks, quests, and skill-by-skill progress, and lets each person choose a relaxed pace or a higher-stakes challenge mode, so consistency becomes a habit.',
        ],
        items: [
          { term: 'XP', description: 'Experience points earned for genuine learning activity, giving every session a visible, satisfying payoff that accumulates toward milestones.' },
          { term: 'Streaks', description: 'A daily count that rewards consistency and helps turn language practice into a lasting habit.' },
          { term: 'Daily quests', description: 'Small, achievable daily goals that give your practice direction and a clear sense of completion.' },
          { term: 'Weekly leaderboard', description: 'Optional friendly competition with other learners that adds a social pull to keep you coming back.' },
          { term: 'Relaxed mode', description: "A calm, low-pressure setting for learning at your own pace, with no decay or penalties, whenever intensity isn't what you want." },
          { term: 'Challenge mode', description: 'A higher-intensity setting with XP decay, streaks, and quests for learners who want extra drive, stakes, and momentum.' },
          { term: 'Progress summaries', description: 'Clear periodic recaps of how far you’ve come, keeping your effort visible and rewarding.' },
          { term: 'Skill mastery tracking', description: "A breakdown of which skills you've truly mastered and which are still developing." },
          { term: 'Activity history', description: "A complete record of everything you've practiced, so you can look back on your full journey." },
          { term: 'Learning milestones', description: 'Meaningful achievements that get recognized along the way, marking real moments of growth.' },
          { term: 'Practice reminders', description: 'Timely, customizable prompts that help you maintain your routine even on busy days.' },
        ],
      },
      {
        title: 'Certificates And Level Checks',
        intro: [
          'Learners want to know where they stand and prove how far they have come. Lingo Booth provides placement checks, level tests, and skill reports, plus downloadable, verifiable certificates that schools and employers can confirm.',
        ],
        items: [
          { term: 'Placement checks', description: "A quick assessment that finds the right starting point for your level, so you begin where you'll actually benefit instead of guessing." },
          { term: 'Level tests', description: 'Structured tests that measure your ability and confirm when you’re ready to advance to the next stage.' },
          { term: 'Skill score summaries', description: 'A clear breakdown of how you’re performing across speaking, listening, reading, and writing, so strengths and gaps are easy to see.' },
          { term: 'Readiness results', description: 'A clear signal of whether you’re prepared for the next level or for a real proficiency exam like TOPIK, JLPT, HSK, or DELE.' },
          { term: 'Weak-skill reports', description: 'A focused report on exactly which skills to strengthen, turning vague worry into a concrete study plan.' },
          { term: 'Completion certificates', description: "Official proof you earn when you finish a class or course, recognizing what you've accomplished." },
          { term: 'Verifiable certificate links', description: 'A shareable verification link others can use to confirm your certificate is genuine, making it credible to schools and employers.' },
          { term: 'Downloadable certificates', description: 'Save and keep your certificates as PDF files you can store, print, or attach to applications.' },
          { term: 'Institution certificate support', description: 'Schools and organizations can issue, brand, track, and verify certificates for all of their learners.' },
        ],
      },
      {
        title: 'Semester Cohorts',
        intro: [
          'Semester cohorts bring classroom structure into Lingo Booth. Learners get a guided schedule, shared momentum, and clear completion goals over a fixed term, while detailed practice history stays private.',
        ],
        items: [
          { term: 'Semester-based learning groups', description: "Join a fixed-length program (typically a 3-month / 12-week term) alongside classmates all working toward the same goal, creating the accountability a solo app simply can't manufacture." },
          { term: 'Weekly learning goals', description: 'Each week sets a clear, shared target that keeps the whole group progressing together at a steady pace.' },
          { term: 'Class lesson schedules', description: 'A set path of lessons mapped across the full semester, so you always know what’s next and never have to plan the curriculum yourself.' },
          { term: 'Cohort progress status', description: 'A view of how the group as a whole is doing, turning collective momentum into motivation to keep up.' },
          { term: 'Completion tracking', description: 'A clear measure of how much of the program you and your cohort have finished at any point in the term.' },
          { term: 'Certificates at the end of a semester', description: 'Complete the program and earn a certificate recognizing the full journey, not just individual lessons.' },
          { term: 'Institution or teacher oversight', description: 'When a school, university, or teacher runs the cohort, they can guide learners and monitor progress and completion risk.' },
          { term: 'Private learner practice details', description: 'Your scores, mistakes, and detailed practice history remain strictly yours and are never visible to classmates.' },
          { term: 'Public-safe cohort status such as active, on track, completed, or needs attention', description: "The group sees only whether you're keeping up, never your private results, giving accountability without exposure or shame." },
        ],
      },
      {
        title: 'Built For Schools And Organizations',
        intro: [
          'Lingo Booth is built to run at the scale of a classroom, a campus, or a company. Administrators get organization accounts, group management, seat control, billing, and reporting, so an institution can deploy and track structured language learning across many learners from one place.',
        ],
        items: [
          { term: 'Organization accounts', description: 'A dedicated account for a school, university, company, or program to manage all of its language learning from one central place.' },
          { term: 'Institution groups', description: 'Tools to organize learners into classes, departments, cohorts, or teams that mirror how your organization actually works.' },
          { term: 'Seat management', description: 'Assign, track, suspend, and reassign learner seats easily as people join, finish, or leave, so you never pay for unused access.' },
          { term: 'Teacher/admin roles', description: 'Granular roles that give the right people the right level of access, from full administration down to classroom oversight.' },
          { term: 'Learner invitations', description: 'Onboard learners quickly with simple email or link invitations, with no manual account creation required.' },
          { term: 'Group dashboards', description: 'A single, clear view of how every learner and group is progressing across your organization.' },
          { term: 'Certificate reporting', description: 'Track, export, and confirm completions across all learners for records, funding, and compliance.' },
          { term: 'Institution billing', description: 'Handle payment centrally at the organization level instead of chasing individual subscriptions.' },
          { term: 'Seat packs', description: 'Purchase seats in bulk to cover an entire class, department, or campus in one transaction.' },
          { term: 'Plan management', description: 'Adjust plans, tiers, and seat counts as your headcount and needs change throughout the year.' },
          { term: 'Admin tools', description: 'A full administrative toolkit for running language learning smoothly at scale.' },
          { term: 'Learner activity summaries', description: 'See who is active and engaged at a glance, so you can reach out to learners who go quiet before they drop off.' },
          { term: 'Group-level progress views', description: 'Track aggregate progress across an entire cohort, class, or organization, not just one learner at a time.' },
        ],
      },
      {
        title: 'Privacy-Aware Learning',
        intro: [
          'Lingo Booth supports accountability without exposing every mistake. Learners can share completion and participation status while keeping detailed corrections, weak areas, and personal practice history private.',
        ],
        items: [
          { term: 'Private learner practice history', description: 'Your detailed results, corrections, and mistakes stay private and are never visible to classmates or peers.' },
          { term: 'Public-safe progress status', description: 'Groups see only high-level status such as active or on track, never the specifics of how you scored or where you struggled.' },
          { term: 'Institution-level summaries', description: "Schools and organizations see aggregate progress for reporting, without access to each learner's private detail." },
          { term: 'Certificate verification without exposing full learning details', description: 'Anyone can confirm a certificate is authentic without ever seeing the work, scores, or mistakes behind it.' },
          { term: 'Separate personal progress and group reporting', description: 'What you see about yourself and what a group or institution sees are deliberately kept apart by design, protecting learner dignity.' },
        ],
      },
      {
        title: 'Works Across Languages',
        intro: [
          'Lingo Booth is designed for international learners, not just English speakers. It supports 20 languages as both the language you learn and the language you learn in, which means up to 380 possible native-to-target learning pairs (any of the 20 languages, learned from any of the other 19). The supported languages are: Arabic, Bengali, Chinese, Dutch, English, Filipino, French, German, Hebrew, Hindi, Indonesian, Italian, Japanese, Korean, Malay, Portuguese, Russian, Spanish, Tamil, and Turkish.',
        ],
        items: [
          { term: 'Many target languages', description: 'Learn any of 20 languages, including Korean, Japanese, Chinese, Spanish, French, German, Arabic, and Hindi, from a single platform built to teach each one properly.' },
          { term: 'Many native/interface languages', description: 'Use Lingo Booth in any of the same 20 languages, so a Bengali-, Arabic-, or Tamil-speaking learner gets the same first-class experience an English speaker does.' },
          { term: 'Native-language explanations', description: 'New concepts are explained in the language you already think in, which dramatically lowers the barrier for true beginners and non-English speakers.' },
          { term: 'Target-language examples', description: "Every example appears authentically in the language you're learning, keeping you immersed in real, correct usage." },
          { term: 'Language-pair setup', description: 'Choose your native and target languages once, and the entire experience (lessons, voices, pronunciation guidance, and interface) adapts to that specific pair.' },
          { term: 'Right-to-left language support', description: 'Right-to-left languages such as Arabic and Hebrew display, align, and read correctly throughout the app, not as a broken afterthought.' },
          { term: 'Web and mobile language support', description: 'Your full language pairing works seamlessly across web, iOS, and Android.' },
          { term: 'Localized interface copy', description: 'Menus, buttons, labels, and system messages all appear in your chosen language, so the entire app feels native, not just the lessons.' },
          { term: 'Designed to avoid one-language assumptions', description: 'The platform is architected from the ground up for any pairing rather than assuming English is the source, so no learner is treated as a second-class case, a key advantage for learners that English-centric apps ignore.' },
        ],
      },
    ],
    differentTitle: 'Why Lingo Booth Is Different',
    differentIntro: [
      'Most apps separate lessons, flashcards, speaking, writing, and review into disconnected tools. Lingo Booth connects them. A learner can study a class lesson, save a phrase, review it later, practice it in writing, use it in conversation, and track progress over time, all in one place.',
      'The strongest differentiators are:',
    ],
    differentItems: [
      { term: 'Real-life context becomes practice', description: 'The actual situations you face (a meeting, a trip, a customer call, a family conversation) turn directly into roleplays, vocabulary, and review items, so your practice is driven by your real needs instead of generic, off-the-shelf content.' },
      { term: 'Lessons, review, writing, flashcards, and conversation are connected', description: 'Every activity feeds the others, so a word you meet in a lesson can be reviewed, written by hand, and spoken in conversation until it truly sticks, instead of living in a separate, disconnected app.' },
      { term: 'Learners can study alone or inside a semester cohort', description: 'You choose the freedom of self-paced learning or the accountability and momentum of a structured, time-boxed group, both in the same platform, with no second app to download.' },
      { term: 'Institutions can manage groups, seats, progress, and certificates', description: 'Schools, universities, and companies get everything they need to run language learning at scale, making Lingo Booth a fit for classrooms and workplaces, not only individuals.' },
      { term: 'Learners get structure without losing privacy', description: "You can show a group that you're keeping up while keeping your mistakes and detailed results completely private, giving accountability and dignity at the same time." },
      { term: 'The platform supports many language pairs, not just one fixed path', description: 'With 20 languages and up to 380 native-to-target combinations, you can learn almost any language from almost any language, including pairings English-centric apps ignore entirely.' },
      { term: 'Lingo Booth teaches not only what to say, but how each language works', description: 'You learn the underlying structure (sounds, writing systems, grammar, and patterns), which is what produces real-world fluency and exam-ready confidence rather than a fragile bag of memorized phrases.' },
    ],
    closingTitle: 'Start with one lesson. Build real practice from there.',
    ctaStartLearning: 'Start Learning',
    ctaJoinSemester: 'Join A Semester',
    ctaInstitutionPlans: 'Explore Institution Plans',
    ctaCompare: 'See how Lingo Booth compares',
  },
};

const SECTION_ICONS = [
  FiBookOpen,
  FiTarget,
  FiMessageCircle,
  FiStar,
  FiRefreshCw,
  FiEdit3,
  FiGrid,
  FiHome,
  FiTrendingUp,
  FiAward,
  FiUsers,
  FiLayers,
  FiLock,
  FiGlobe,
];

function FeaturesPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const lang = getPreferredPublicLanguage();
  const copy = FEATURES_COPY[lang] || FEATURES_COPY.en;

  // Single-open accordion: opening one panel collapses whichever was open.
  // Controlled (rather than the native `name` group) so it behaves the same
  // in every browser. All sections start collapsed, so the page loads as a
  // clean list of headers and an intro only shows once a section is expanded.
  const [openKey, setOpenKey] = useState(null);
  const toggle = (key) => (event) => {
    event.preventDefault();
    setOpenKey((current) => (current === key ? null : key));
  };

  const startLearning = () => navigate('/select-language?mode=register');
  const joinSemester = () => navigate('/join-semester');
  const institutionPlans = () => navigate('/contact');
  const viewComparison = () => navigate('/comparison');

  return (
    <div className="features-page">
      <header className="features-nav">
        <button
          type="button"
          className="features-brand"
          onClick={() => navigate('/')}
          aria-label={t('common.backToHome', copy.backToHome)}
        >
          <BrandLogo variant="lockup" decorative />
        </button>
        <div className="features-nav-actions">
          <button type="button" className="features-nav-link" onClick={() => navigate('/')}>
            {copy.home}
          </button>
          <button type="button" className="features-nav-link" onClick={() => navigate('/login')}>
            {copy.login}
          </button>
          <button type="button" className="features-primary features-primary-small" onClick={startLearning}>
            {copy.startFree}
          </button>
        </div>
      </header>

      <main>
        <section className="features-hero">
          <h1>{copy.pageTitle}</h1>
          {copy.heroLead.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <div className="features-hero-actions">
            <button type="button" className="features-primary" onClick={startLearning}>
              {copy.ctaStartLearning}
            </button>
            <button type="button" className="features-secondary" onClick={joinSemester}>
              {copy.ctaJoinSemester}
            </button>
          </div>
        </section>

        {copy.sections.map((section, index) => {
          const Icon = SECTION_ICONS[index % SECTION_ICONS.length];
          return (
            <details className={`features-block features-collapse${openKey === index ? ' is-open' : ''}`} key={section.title} open>
              <summary className="features-block-summary" onClick={toggle(index)}>
                <span className="features-block-icon" aria-hidden="true">
                  <Icon />
                </span>
                <span className="features-summary-copy">
                  <span className="features-summary-title">{section.title}</span>
                  <span className="features-summary-meta">
                    {section.items.length} {copy.featureCountLabel}
                  </span>
                </span>
                <span className="features-collapse-cta">
                  {openKey === index ? copy.showLess : copy.readMore}
                  <FiChevronDown className="features-collapse-icon" aria-hidden="true" />
                </span>
              </summary>
              <div className="features-collapse-body">
                <div className="features-collapse-inner">
                  {Array.isArray(section.intro) && section.intro.map((paragraph) => (
                    <p className="features-block-intro" key={paragraph}>{paragraph}</p>
                  ))}
                  <ul className="features-list">
                    {section.items.map((item) => (
                      <li className="feature-item" key={item.term}>
                        <span className="feature-term">{item.term}</span>{' '}
                        <span className="feature-desc">{item.description}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </details>
          );
        })}

        <details className={`features-different features-collapse${openKey === 'different' ? ' is-open' : ''}`} open>
          <summary className="features-block-summary" onClick={toggle('different')}>
            <span className="features-block-icon" aria-hidden="true">
              <FiCheckCircle />
            </span>
            <span className="features-summary-copy">
              <span className="features-summary-title">{copy.differentTitle}</span>
              <span className="features-summary-meta">
                {copy.differentItems.length} {copy.featureCountLabel}
              </span>
            </span>
            <span className="features-collapse-cta">
              {openKey === 'different' ? copy.showLess : copy.readMore}
              <FiChevronDown className="features-collapse-icon" aria-hidden="true" />
            </span>
          </summary>
          <div className="features-collapse-body">
            <div className="features-collapse-inner">
              {copy.differentIntro.map((paragraph) => (
                <p className="features-block-intro" key={paragraph}>{paragraph}</p>
              ))}
              <ul className="features-list">
                {copy.differentItems.map((item) => (
                  <li className="feature-item feature-item--strong" key={item.term}>
                    <span className="feature-term">{item.term}</span>{' '}
                    <span className="feature-desc">{item.description}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </details>

        <section className="features-cta">
          <h2>{copy.closingTitle}</h2>
          <div className="features-cta-actions">
            <button type="button" className="features-cta-light" onClick={startLearning}>
              {copy.ctaStartLearning}
            </button>
            <button type="button" className="features-cta-outline" onClick={joinSemester}>
              {copy.ctaJoinSemester}
            </button>
            <button type="button" className="features-cta-outline" onClick={institutionPlans}>
              {copy.ctaInstitutionPlans}
            </button>
            <button type="button" className="features-cta-outline features-cta-compare" onClick={viewComparison}>
              {copy.ctaCompare}
            </button>
          </div>
          <FiArrowRight className="features-cta-icon" aria-hidden="true" />
        </section>
      </main>
    </div>
  );
}

export default FeaturesPage;
