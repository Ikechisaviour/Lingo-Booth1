import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FiCheckCircle, FiChevronLeft, FiChevronRight, FiPlayCircle, FiSkipForward, FiStopCircle } from 'react-icons/fi';
import { curriculumV2Service, ttsService } from '../../services/api';
import speechService from '../../services/speechService';
import { voiceGender } from '../../utils/roleVoices';
import PlayableKorean from '../../components/PlayableKorean';
import './HangulOnboardingPage.css';

// Default voices we'll fall back on when nothing better is available. Picked
// to be a matched-gender pair: SunHi (F, ko-KR) + Jenny (F, en-US). When the
// user prefers a male voice for the target language we swap both sides to
// the male defaults — keeping one voice "feel" across both languages.
const VOICE_DEFAULTS = {
  female: { ko: 'ko-KR-SunHiNeural',  en: 'en-US-JennyNeural' },
  male:   { ko: 'ko-KR-InJoonNeural', en: 'en-US-GuyNeural' },
};

// Module-level cache. The Edge TTS catalog has ~400 voices; we only need
// gender + ShortName, and the result is stable for a session.
let voiceCatalogPromise = null;
function loadVoiceCatalog() {
  if (voiceCatalogPromise) return voiceCatalogPromise;
  voiceCatalogPromise = ttsService.getVoices()
    .then((res) => {
      const map = {};
      for (const v of (res.data || [])) {
        if (!v?.ShortName) continue;
        const g = v.Gender === 'Male' ? 'M' : v.Gender === 'Female' ? 'F' : '';
        if (g) map[v.ShortName] = g;
      }
      return map;
    })
    .catch(() => ({}));
  return voiceCatalogPromise;
}

// Pick a same-gender voice for `targetLang` from the catalog. Used to bridge
// to the user's English voice when their preferred English doesn't match
// the gender of their preferred Korean.
function pickSameGenderVoice(catalog, targetLang, gender) {
  const prefix = `${targetLang}-`;
  for (const [name, g] of Object.entries(catalog)) {
    if (g === gender && name.startsWith(prefix)) return name;
  }
  return gender === 'M' ? VOICE_DEFAULTS.male.en : VOICE_DEFAULTS.female.en;
}

async function resolveHangulVoicesAsync() {
  const catalog = await loadVoiceCatalog();
  // Local resolver: tries the static roleVoices map first, then the live
  // Edge catalog. Returns '' when truly unknown.
  const genderOf = (name) => voiceGender(name) || catalog[name] || '';

  const userKo = speechService.getSelectedVoiceName('ko') || VOICE_DEFAULTS.female.ko;
  const targetGender = genderOf(userKo) === 'M' ? 'M' : 'F';

  const userEn = speechService.getSelectedVoiceName('en');
  let nativeVoice;
  if (userEn && genderOf(userEn) === targetGender) {
    nativeVoice = userEn;
  } else {
    // Prefer the targetGender's en-US default; if that's not in the catalog
    // for some reason, scan the catalog for any matching-gender en-US voice.
    const wanted = targetGender === 'M' ? VOICE_DEFAULTS.male.en : VOICE_DEFAULTS.female.en;
    nativeVoice = catalog[wanted] === targetGender
      ? wanted
      : pickSameGenderVoice(catalog, 'en-US', targetGender);
  }
  return { targetVoice: userKo, nativeVoice, targetGender };
}

// Romanization parentheticals — e.g. "(appa)" in "as in 아빠 (appa) — bright,
// open" — are a VISUAL aid only. They duplicate sound information that the
// Korean letter playback already gives, and TTS would mispronounce them as
// English approximations. Strip before sending to audio.
function stripParentheticals(text) {
  return String(text || '')
    .replace(/\s*\([^)]*\)/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

// Split a mixed-script string into ordered chunks tagged by language so each
// chunk can be sent to TTS with an explicit voice. Without this, a string
// like "as in 아빠 — bright, open" gets the WHOLE string routed to the
// Korean voice (because detectLanguage matches on the first Korean char),
// and the English words come out mispronounced.
function splitByScript(text) {
  // Hangul Syllables (U+AC00–U+D7AF) + Hangul Compatibility Jamo (U+3130–U+318F).
  const koPattern = /[㄰-㆏가-힯]+/g;
  const trim = (s) => s.replace(/^[\s\-—•·.,;:!?()]+|[\s\-—•·.,;:!?()]+$/g, '').trim();
  const out = [];
  let lastIdx = 0;
  let m;
  // eslint-disable-next-line no-cond-assign
  while ((m = koPattern.exec(text)) !== null) {
    const before = trim(text.slice(lastIdx, m.index));
    if (before) out.push({ text: before, lang: 'en-US' });
    out.push({ text: m[0], lang: 'ko-KR' });
    lastIdx = m.index + m[0].length;
  }
  const tail = trim(text.slice(lastIdx));
  if (tail) out.push({ text: tail, lang: 'en-US' });
  return out.length ? out : [{ text: text.trim(), lang: 'en-US' }];
}

// Single jamo letters (ㅏ, ㄱ, ㄲ, etc.) aren't pronounceable by TTS engines —
// they're sub-syllabic units. To "speak the letter's sound" we wrap each one
// in its minimal pronounceable form: vowels get the silent ㅇ placeholder
// (ㅏ → 아 sounds like "ah"); consonants get the neutral schwa-like ㅡ vowel
// as carrier (ㄱ → 그 sounds like "geu", isolating the consonant). This is
// the standard Korean-as-a-foreign-language convention for letter playback.
const PLAYABLE_JAMO = {
  // Basic vowels — prepend ㅇ
  'ㅏ': '아', 'ㅓ': '어', 'ㅗ': '오', 'ㅜ': '우', 'ㅡ': '으', 'ㅣ': '이', 'ㅐ': '애', 'ㅔ': '에',
  // Y-vowels
  'ㅑ': '야', 'ㅕ': '여', 'ㅛ': '요', 'ㅠ': '유', 'ㅒ': '얘', 'ㅖ': '예',
  // W-vowels + ㅢ
  'ㅘ': '와', 'ㅝ': '워', 'ㅙ': '왜', 'ㅞ': '웨', 'ㅚ': '외', 'ㅟ': '위', 'ㅢ': '의',
  // Plain consonants — consonant + ㅡ (neutral carrier)
  'ㄱ': '그', 'ㄴ': '느', 'ㄷ': '드', 'ㄹ': '르', 'ㅁ': '므',
  'ㅂ': '브', 'ㅅ': '스', 'ㅈ': '즈', 'ㅎ': '흐', 'ㅇ': '응',
  // Aspirated consonants
  'ㅋ': '크', 'ㅌ': '트', 'ㅍ': '프', 'ㅊ': '츠',
  // Tense consonants
  'ㄲ': '끄', 'ㄸ': '뜨', 'ㅃ': '쁘', 'ㅆ': '쓰', 'ㅉ': '쯔',
};

function jamoPlayable(jamo) {
  return PLAYABLE_JAMO[jamo] || jamo;
}

function HangulOnboardingPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const refresherMode = searchParams.get('mode') === 'refresher';

  const [groups, setGroups] = useState([]);
  const [progress, setProgress] = useState({ completedGroups: [], onboardingCompletedAt: null });
  const [activeIdx, setActiveIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [skipping, setSkipping] = useState(false);
  const [error, setError] = useState('');
  // Tracks which (if any) sequential playback is currently running. Either
  // 'page' (full screen walkthrough) or `card:<jamo>` for one card's worth.
  // Only one runs at a time — starting a new one cancels the previous.
  const [playingScope, setPlayingScope] = useState(null);
  const sequenceRef = useRef({ cancelled: true });

  useEffect(() => {
    let active = true;
    Promise.all([curriculumV2Service.getHangulGroups(), curriculumV2Service.getHangulProgress()])
      .then(([groupsRes, progressRes]) => {
        if (!active) return;
        setGroups(groupsRes.data?.groups || []);
        const initialProgress = progressRes.data || { completedGroups: [], onboardingCompletedAt: null };
        setProgress(initialProgress);
        // Resume at the first incomplete group, or stay at 0 for refresher mode.
        if (!refresherMode && initialProgress.completedGroups?.length) {
          const sortedGroups = (groupsRes.data?.groups || []).slice().sort((a, b) => a.order - b.order);
          const firstIncomplete = sortedGroups.findIndex((g) => !initialProgress.completedGroups.includes(g.id));
          if (firstIncomplete >= 0) setActiveIdx(firstIncomplete);
        }
      })
      .catch((err) => {
        if (active) setError(err.response?.data?.message || t('hangul.loadFailed', 'Could not load Hangul lessons.'));
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => { active = false; };
  }, [refresherMode, t]);

  const sortedGroups = useMemo(
    () => groups.slice().sort((a, b) => a.order - b.order),
    [groups],
  );
  const activeGroup = sortedGroups[activeIdx] || null;
  const isCompletedGroup = (id) => (progress.completedGroups || []).includes(id);

  // ─── Sequential playback ───────────────────────────────────────────
  // Each item gets split by script into pure-language chunks, and each
  // chunk is sent with an explicit voice. The voice pair (target + native)
  // is resolved async from the live Edge TTS catalog so gender matches no
  // matter which voice the user picked.

  const [voices, setVoices] = useState(() => ({
    targetVoice: speechService.getSelectedVoiceName('ko') || VOICE_DEFAULTS.female.ko,
    nativeVoice: VOICE_DEFAULTS.female.en,
    targetGender: 'F',
  }));

  useEffect(() => {
    let cancelled = false;
    resolveHangulVoicesAsync().then((v) => { if (!cancelled) setVoices(v); });
    return () => { cancelled = true; };
  }, []);

  const stopSequence = useCallback(() => {
    sequenceRef.current.cancelled = true;
    speechService.cancel();
    setPlayingScope(null);
  }, []);

  const playSequence = useCallback(async (scope, texts) => {
    const items = (texts || []).map((t) => String(t || '').trim()).filter(Boolean);
    if (!items.length) return;
    sequenceRef.current.cancelled = true;
    speechService.cancel();
    const token = { cancelled: false };
    sequenceRef.current = token;
    setPlayingScope(scope);
    try {
      for (const text of items) {
        if (token.cancelled) break;
        const chunks = splitByScript(text);
        for (const chunk of chunks) {
          if (token.cancelled) break;
          const voice = chunk.lang === 'ko-KR' ? voices.targetVoice : voices.nativeVoice;
          await speechService.speakAsync(chunk.text, { lang: chunk.lang, voice });
          if (token.cancelled) break;
          // Tiny inter-chunk gap so script-switch transitions don't sound rushed.
          await new Promise((resolve) => setTimeout(resolve, 80));
        }
        if (token.cancelled) break;
        // Breath between sequence items.
        await new Promise((resolve) => setTimeout(resolve, 220));
      }
    } finally {
      if (sequenceRef.current === token) setPlayingScope(null);
    }
  }, [voices]);

  // Stop any in-flight playback when leaving the page or switching groups.
  useEffect(() => () => stopSequence(), [stopSequence]);
  useEffect(() => { stopSequence(); }, [activeIdx, stopSequence]);

  // Build the spoken-text sequence for ONE jamo card. The English gloss
  // (sound description + pronunciation tip) is included so a learner who's
  // just listening hears the same teaching they'd see on screen. Per-example
  // English meanings ("dad", "apple") are intentionally left out — the
  // examples are about reproducing the sound, not vocabulary.
  const buildJamoCardSequence = useCallback((j) => {
    const out = [];
    // Order mirrors how the card reads top-to-bottom on screen:
    //   1. the letter itself (the headline)
    //   2. the English sound description (parentheticals stripped — those
    //      are visual romanization aids, not meant to be spoken)
    //   3. a bilingual "example" announcement so the learner hears the word
    //      "example" in BOTH languages before the actual examples play
    //   4. each example word in Korean
    //   5. the pronunciation tip
    out.push(jamoPlayable(j.jamo));
    if (j?.sound) out.push(stripParentheticals(j.sound));
    const examples = (j.examples || []).filter((ex) => ex?.word);
    if (examples.length) {
      out.push('예시');     // Korean voice — "example/illustration"
      out.push('Example');  // Native voice — same word in English
      for (const ex of examples) out.push(ex.word);
    }
    if (j?.tips) out.push(j.tips);
    return out;
  }, []);

  // Build the spoken-text sequence for the WHOLE active group. Starts with
  // the title (English + its Korean equivalent), then the subtitle, then
  // every card's contents (gloss included).
  const buildPageSequence = useCallback((group) => {
    if (!group) return [];
    const out = [];
    if (group.title)    out.push(group.title);
    if (group.titleKo)  out.push(group.titleKo);
    if (group.subtitle) out.push(group.subtitle);

    if (group.kind === 'vowels' || group.kind === 'consonants') {
      for (const j of (group.jamo || [])) {
        out.push(...buildJamoCardSequence(j));
      }
      return out;
    }
    if (group.kind === 'structure') {
      // Read each structural note (English), then for each example play the
      // syllable and read its morpheme breakdown. The bare meaning gloss is
      // skipped to match the example-meaning rule.
      for (const note of (group.structureNotes || [])) {
        if (note) out.push(note);
      }
      for (const ex of (group.examples || [])) {
        if (ex?.syllable)  out.push(ex.syllable);
        if (ex?.breakdown) out.push(ex.breakdown);
      }
      return out;
    }
    if (group.kind === 'practice') {
      // Static practice instructions text lives in the JSX rather than the
      // data, so embed it here so the audio matches what's on screen.
      out.push('Read each word aloud before peeking. Tap the speaker to compare.');
      const TIER_LABEL = { 1: 'Tier 1', 2: 'Tier 2', 3: 'Tier 3', 4: 'Tier 4' };
      const tiers = [...new Set((group.practice || []).map((p) => p.tier))].sort();
      for (const tier of tiers) {
        if (TIER_LABEL[tier]) out.push(TIER_LABEL[tier]);
        for (const p of (group.practice || []).filter((x) => x.tier === tier)) {
          if (p.word) out.push(p.word);
        }
      }
      return out;
    }
    return out;
  }, [buildJamoCardSequence]);

  const isPagePlaying = playingScope === 'page';
  const pageSequence = useMemo(() => buildPageSequence(activeGroup), [activeGroup, buildPageSequence]);

  const togglePagePlayback = useCallback(() => {
    if (isPagePlaying) stopSequence();
    else playSequence('page', pageSequence);
  }, [isPagePlaying, pageSequence, playSequence, stopSequence]);

  const toggleCardPlayback = useCallback((j) => {
    const scope = `card:${j.jamo}`;
    if (playingScope === scope) stopSequence();
    else playSequence(scope, buildJamoCardSequence(j));
  }, [playingScope, playSequence, stopSequence, buildJamoCardSequence]);

  const handleSkip = useCallback(async () => {
    const ok = window.confirm(
      t(
        'hangul.skipConfirm',
        'Skip Hangul onboarding? You can come back any time from the session header.',
      ),
    );
    if (!ok) return;
    setSkipping(true);
    setError('');
    try {
      await curriculumV2Service.skipHangul();
      navigate('/learn/v2');
    } catch (err) {
      setError(err.response?.data?.message || t('hangul.saveFailed', 'Could not save progress.'));
      setSkipping(false);
    }
  }, [navigate, t]);

  const completeAndAdvance = useCallback(async () => {
    if (!activeGroup) return;
    setSaving(true);
    setError('');
    try {
      const res = await curriculumV2Service.completeHangulGroup(activeGroup.id);
      setProgress({
        completedGroups: res.data?.completedGroups || [],
        onboardingCompletedAt: res.data?.onboardingCompletedAt || null,
      });
      if (activeIdx < sortedGroups.length - 1) {
        setActiveIdx(activeIdx + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (res.data?.onboardingComplete && !refresherMode) {
        // Finished the final group — go straight into A1 grammar.
        navigate('/learn/v2');
      }
    } catch (err) {
      setError(err.response?.data?.message || t('hangul.saveFailed', 'Could not save progress.'));
    } finally {
      setSaving(false);
    }
  }, [activeGroup, activeIdx, sortedGroups.length, navigate, refresherMode, t]);

  if (loading) {
    return <div className="hangul-page"><div className="hangul-loading">{t('common.loading', 'Loading…')}</div></div>;
  }

  if (!sortedGroups.length) {
    return (
      <div className="hangul-page">
        <p className="hangul-error">{error || t('hangul.empty', 'No Hangul content available.')}</p>
      </div>
    );
  }

  return (
    <main className="hangul-page">
      <header className="hangul-header">
        <button type="button" className="hangul-link" onClick={() => navigate('/learn/v2')}>
          <FiChevronLeft /> {t('hangul.backToLearn', 'Back to Learn')}
        </button>
        <p className="hangul-kicker">
          {refresherMode ? t('hangul.refresherKicker', 'Hangul refresher') : t('hangul.onboardingKicker', 'Hangul onboarding')}
        </p>
        <h1>{t('hangul.title', 'Read Korean')}</h1>
        <p className="hangul-subtitle">
          {t('hangul.subtitle', 'Eight short lessons. Hear every letter, learn how blocks build syllables, then read real words.')}
        </p>
        {!refresherMode && !progress.onboardingCompletedAt && (
          <button
            type="button"
            className="hangul-skip"
            onClick={handleSkip}
            disabled={skipping || saving}
          >
            <FiSkipForward /> {skipping
              ? t('common.saving', 'Saving…')
              : t('hangul.alreadyKnow', 'I already read Hangul — skip')}
          </button>
        )}
      </header>

      <nav className="hangul-progress-track" aria-label={t('hangul.progressLabel', 'Progress')}>
        {sortedGroups.map((g, idx) => (
          <button
            key={g.id}
            type="button"
            className={`hangul-progress-step ${idx === activeIdx ? 'active' : ''} ${isCompletedGroup(g.id) ? 'done' : ''}`}
            onClick={() => setActiveIdx(idx)}
            title={g.title}
          >
            {isCompletedGroup(g.id) ? <FiCheckCircle /> : g.order}
          </button>
        ))}
      </nav>

      {error && <div className="hangul-error">{error}</div>}

      {activeGroup && (
        <article className="hangul-card">
          <header className="hangul-card-head">
            <span className="hangul-card-tag">{t('hangul.stepN', 'Step {{step}} of {{total}}', { step: activeIdx + 1, total: sortedGroups.length })}</span>
            <h2>
              {activeGroup.title}
              {activeGroup.titleKo && (
                <span className="hangul-card-title-ko" lang="ko">{activeGroup.titleKo}</span>
              )}
            </h2>
            <p className="hangul-card-subtitle">{activeGroup.subtitle}</p>
            {pageSequence.length > 0 && (
              <button
                type="button"
                className={`hangul-play-page ${isPagePlaying ? 'is-playing' : ''}`}
                onClick={togglePagePlayback}
                aria-label={isPagePlaying ? t('hangul.stopPage', 'Stop') : t('hangul.playPage', 'Play whole page')}
              >
                {isPagePlaying ? <FiStopCircle /> : <FiPlayCircle />}
                <span>{isPagePlaying
                  ? t('hangul.stopPage', 'Stop')
                  : t('hangul.playPage', 'Play whole page')}</span>
              </button>
            )}
          </header>

          {(activeGroup.kind === 'vowels' || activeGroup.kind === 'consonants') && (
            <div className="hangul-jamo-grid">
              {(activeGroup.jamo || []).map((j) => {
                const cardScope = `card:${j.jamo}`;
                const isThisCardPlaying = playingScope === cardScope;
                return (
                <div key={j.jamo} className="hangul-jamo-card">
                  <div className="hangul-jamo-letter">
                    <PlayableKorean text={jamoPlayable(j.jamo)} lang="ko-KR" voice={voices.targetVoice} ariaLabel={t('hangul.playLetter', 'Play letter sound')} />
                    <strong>{j.jamo}</strong>
                    <small>{j.romanization}</small>
                    <button
                      type="button"
                      className={`hangul-play-card ${isThisCardPlaying ? 'is-playing' : ''}`}
                      onClick={() => toggleCardPlayback(j)}
                      aria-label={isThisCardPlaying
                        ? t('hangul.stopCard', 'Stop')
                        : t('hangul.playCard', 'Play whole card')}
                    >
                      {isThisCardPlaying ? <FiStopCircle /> : <FiPlayCircle />}
                      <span>{isThisCardPlaying ? t('hangul.stopCard', 'Stop') : t('hangul.playCard', 'Play card')}</span>
                    </button>
                  </div>
                  <p className="hangul-jamo-sound">{j.sound}</p>
                  {Array.isArray(j.examples) && j.examples.length > 0 && (
                    <ul className="hangul-jamo-examples">
                      {j.examples.map((ex) => (
                        <li key={ex.word}>
                          <div className="hangul-jamo-example-row">
                            <PlayableKorean text={ex.word} lang="ko-KR" voice={voices.targetVoice} ariaLabel={t('hangul.play', 'Play')} />
                            <strong>{ex.word}</strong>
                            {ex.romanization && (
                              <em className="hangul-jamo-example-roman">{ex.romanization}</em>
                            )}
                          </div>
                          {ex.native && (
                            <small className="hangul-jamo-example-gloss">{ex.native}</small>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                  {j.tips && <p className="hangul-jamo-tips">{j.tips}</p>}
                </div>
                );
              })}
            </div>
          )}

          {activeGroup.kind === 'structure' && (
            <div className="hangul-structure">
              <ol className="hangul-structure-notes">
                {(activeGroup.structureNotes || []).map((note, i) => <li key={i}>{note}</li>)}
              </ol>
              <div className="hangul-structure-examples">
                {(activeGroup.examples || []).map((ex) => (
                  <div key={ex.syllable} className="hangul-structure-example">
                    <PlayableKorean text={ex.syllable} lang="ko-KR" voice={voices.targetVoice} ariaLabel={t('hangul.play', 'Play')} />
                    <strong>{ex.syllable}</strong>
                    <small>{ex.sound}</small>
                    <p>{ex.breakdown}</p>
                    <em>{ex.meaning}</em>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeGroup.kind === 'practice' && (
            <div className="hangul-practice">
              <p className="hangul-practice-instructions">
                {t('hangul.practiceInstructions', 'Read each word aloud before peeking. Tap the speaker to compare.')}
              </p>
              {[1, 2, 3, 4].map((tier) => (
                <div key={tier} className="hangul-practice-tier">
                  <h3>{t('hangul.tier', 'Tier {{tier}}', { tier })}</h3>
                  <ul>
                    {(activeGroup.practice || []).filter((p) => p.tier === tier).map((p) => (
                      <li key={p.word}>
                        <PlayableKorean text={p.word} lang="ko-KR" voice={voices.targetVoice} ariaLabel={t('hangul.play', 'Play')} />
                        <strong>{p.word}</strong>
                        <details>
                          <summary>{t('hangul.reveal', 'Reveal')}</summary>
                          <span>{p.romanization} · {p.gloss}</span>
                        </details>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          <footer className="hangul-card-foot">
            <button
              type="button"
              className="hangul-secondary"
              onClick={() => setActiveIdx(Math.max(0, activeIdx - 1))}
              disabled={activeIdx === 0 || saving}
            >
              <FiChevronLeft /> {t('common.previous', 'Previous')}
            </button>
            <button
              type="button"
              className="hangul-primary"
              onClick={completeAndAdvance}
              disabled={saving}
            >
              {saving
                ? t('common.saving', 'Saving…')
                : (activeIdx === sortedGroups.length - 1
                  ? (refresherMode ? t('hangul.done', 'Done') : t('hangul.finishAndLearn', 'Start A1 grammar'))
                  : t('hangul.next', 'Next'))}
              <FiChevronRight />
            </button>
          </footer>
        </article>
      )}
    </main>
  );
}

export default HangulOnboardingPage;
