import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FiBookOpen,
  FiCheck,
  FiChevronRight,
  FiEdit3,
  FiGlobe,
  FiHeadphones,
  FiHeart,
  FiLayers,
  FiMessageCircle,
  FiMic,
  FiMonitor,
  FiPlay,
  FiRefreshCw,
  FiSmartphone,
  FiTablet,
  FiVolume2,
} from 'react-icons/fi';
import './LandingPage.css';

const highlights = [
  {
    icon: FiBookOpen,
    title: 'Clear lessons',
    text: 'Step-by-step guidance with examples you can actually use.',
  },
  {
    icon: FiMessageCircle,
    title: 'Real speaking',
    text: 'Roleplays, voice input, replay, slower replies, and hands-free practice.',
  },
  {
    icon: FiVolume2,
    title: 'Sound that fits you',
    text: 'Pronunciation guidance shaped for your native language and script.',
  },
  {
    icon: FiRefreshCw,
    title: 'Steady progress',
    text: 'Choose relaxed learning or challenge mode when you want pressure.',
  },
];

const loopSteps = [
  { icon: FiBookOpen, label: 'Learn' },
  { icon: FiEdit3, label: 'Practice' },
  { icon: FiMic, label: 'Speak' },
  { icon: FiLayers, label: 'Write' },
  { icon: FiRefreshCw, label: 'Review' },
];

const thoughtfulDetails = [
  { icon: FiGlobe, title: 'Native-aware sounds', text: 'Hear the target language and explanations in the way that works best for you.' },
  { icon: FiHeadphones, title: 'Separate target/native voices', text: 'Pick different voices so both languages sound natural.' },
  { icon: FiPlay, title: 'Personalized real-life practice', text: 'Turn your words, goals, and situations into practice you will actually use.' },
  { icon: FiRefreshCw, title: 'Continue where you stopped', text: 'Your progress saves and resumes across activities and devices.' },
  { icon: FiMonitor, title: 'Works on web, mobile, and tablet', text: 'One experience, perfectly adapted to every screen.' },
];

const comparisonRows = [
  { icon: FiBookOpen, feature: 'Lessons', typical: 'Limited or text-heavy', lingo: 'Guided lessons with clear steps and examples' },
  { icon: FiMic, feature: 'Speaking', typical: 'Minimal speaking practice', lingo: 'Roleplays, voice input, replay, and slower replies' },
  { icon: FiVolume2, feature: 'Pronunciation', typical: 'Basic audio or romanization', lingo: 'Native-aware pronunciation with script support' },
  { icon: FiEdit3, feature: 'Writing', typical: 'Rarely included', lingo: 'Trace, copy, listen, meanings, stroke order, review' },
  { icon: FiGlobe, feature: 'Personalization', typical: 'Generic content', lingo: 'Real-life topics, notes, and goals you approve' },
  { icon: FiLayers, feature: 'Progress', typical: 'Streaks only', lingo: 'Skill progress across listening, speaking, reading, and writing' },
];

function LandingPage() {
  const navigate = useNavigate();

  const startFree = () => navigate('/select-language?mode=register');
  const tryGuest = () => navigate('/select-language?mode=guest');

  return (
    <div className="landing-page">
      <header className="landing-nav">
        <button type="button" className="landing-brand" onClick={() => navigate('/')}>
          <span className="landing-brand-mark" aria-hidden="true">
            <FiMessageCircle />
          </span>
          <span>Lingo Booth</span>
        </button>
        <nav aria-label="Landing navigation">
          <a href="#learn">Learn</a>
          <a href="#practice">Practice</a>
          <a href="#speak">Speak</a>
        </nav>
        <div className="landing-nav-actions">
          <button type="button" className="landing-login" onClick={() => navigate('/login')}>
            Login
          </button>
          <button type="button" className="landing-primary landing-primary-small" onClick={startFree}>
            Start free
          </button>
        </div>
      </header>

      <main>
        <section className="landing-hero" id="learn">
          <div className="landing-hero-copy">
            <h1>One calm place to learn, practice, and speak</h1>
            <p>
              Guided lessons, native-aware pronunciation, writing, flashcards,
              AI conversation, and progress across web, mobile, and tablet.
            </p>
            <div className="landing-hero-actions">
              <button type="button" className="landing-primary" onClick={startFree}>
                Start free
              </button>
              <button type="button" className="landing-secondary" onClick={tryGuest}>
                Try as guest
              </button>
            </div>
          </div>

          <div className="landing-hero-visual">
            <img
              src="/images/landing-hero.png"
              alt="Microphone, speech bubbles, and devices for Lingo Booth language practice"
              className="landing-hero-image"
            />
          </div>
        </section>

        <section className="landing-highlights" aria-label="Key strengths">
          {highlights.map(({ icon: Icon, title, text }) => (
            <article key={title}>
              <Icon aria-hidden="true" />
              <h2>{title}</h2>
              <p>{text}</p>
            </article>
          ))}
        </section>

        <section className="landing-loop" id="practice">
          <div className="landing-section-heading">
            <h2>The full learning loop, without the clutter</h2>
            <span />
          </div>
          <div className="loop-steps">
            {loopSteps.map(({ icon: Icon, label }, index) => (
              <React.Fragment key={label}>
                <div className="loop-step">
                  <div><Icon aria-hidden="true" /></div>
                  <strong>{label}</strong>
                </div>
                {index < loopSteps.length - 1 && <FiChevronRight className="loop-arrow" aria-hidden="true" />}
              </React.Fragment>
            ))}
          </div>
        </section>

        <section className="landing-details" id="speak">
          <div className="detail-list">
            <p className="landing-kicker">Built with learner comfort in mind</p>
            <h2>Thoughtful details learners feel</h2>
            <div className="detail-rows">
              {thoughtfulDetails.map(({ icon: Icon, title, text }) => (
                <article key={title}>
                  <Icon aria-hidden="true" />
                  <div>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="product-preview" aria-label="Lingo Booth product preview">
            <div className="preview-tabs">
              <span className="active">Class</span>
              <span>Conversation</span>
              <span>Review</span>
            </div>
            <div className="preview-message">
              <small>Tutor</small>
              <p>Great. Let us practice ordering coffee. What would you like to order?</p>
            </div>
            <div className="preview-pronunciation-grid">
              <span>Pronunciation guide</span>
              <div>
                <strong>안녕하세요</strong>
                <small>Hello</small>
              </div>
              <div>
                <strong>처음 뵙겠습니다</strong>
                <small>Nice to meet you</small>
              </div>
              <div>
                <strong>감사합니다</strong>
                <small>Thank you</small>
              </div>
            </div>
            <p className="preview-mode-label">Learning mode</p>
            <div className="preview-mode">
              <span>Relaxed <small>Low pressure, learn at your pace</small></span>
              <strong>Challenge <small>XP decay, streaks, and quests</small></strong>
            </div>
            <p className="preview-mode-label">Learn anywhere</p>
            <div className="preview-devices">
              <span><FiMonitor /> Web</span>
              <span><FiSmartphone /> Mobile</span>
              <span><FiTablet /> Tablet</span>
            </div>
          </div>
        </section>

        <section className="landing-comparison">
          <div className="landing-section-heading">
            <h2>More complete than a flashcard app</h2>
            <span />
          </div>
          <div className="comparison-table" role="table" aria-label="Lingo Booth comparison">
            <div className="comparison-row comparison-head" role="row">
              <span role="columnheader">Feature</span>
              <span role="columnheader">Typical apps</span>
              <span role="columnheader">Lingo Booth</span>
            </div>
            {comparisonRows.map(({ icon: Icon, feature, typical, lingo }) => (
              <div className="comparison-row" role="row" key={feature}>
                <strong role="cell">
                  <Icon aria-hidden="true" />
                  {feature}
                </strong>
                <span role="cell" data-label="Typical apps">{typical}</span>
                <span role="cell" className="comparison-win">
                  <FiCheck aria-hidden="true" />
                  <span data-label="Lingo Booth">{lingo}</span>
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="landing-cta">
          <div>
            <h2>Start learning with clarity today</h2>
            <p>Learn on web, mobile, or tablet.</p>
          </div>
          <div>
            <button type="button" className="landing-cta-light" onClick={startFree}>
              Start free
            </button>
            <button type="button" className="landing-cta-outline" onClick={tryGuest}>
              Try as guest
            </button>
          </div>
          <FiHeart className="cta-line-icon" aria-hidden="true" />
        </section>
      </main>
    </div>
  );
}

export default LandingPage;
