import TrackPlayer from 'react-native-track-player';
import { ttsService } from './api';

let playerReady = false;
let speaking = false;
let cancelFlag = false;

/**
 * Initialise TrackPlayer once. Safe to call multiple times — subsequent calls
 * are no-ops. Must be called while the app is in the foreground.
 */
async function setup(): Promise<void> {
  if (playerReady) return;
  try {
    await TrackPlayer.setupPlayer({
      minBuffer: 5,
      maxBuffer: 30,
      waitForBuffer: true,
    });
    const { Capability } = require('react-native-track-player');
    await TrackPlayer.updateOptions({
      capabilities: [Capability.Play, Capability.Pause, Capability.Stop],
      compactCapabilities: [Capability.Play, Capability.Pause, Capability.Stop],
    });
    playerReady = true;
  } catch (e: any) {
    // "The player has already been initialized" — treat as success
    if (e?.code === 'player_already_initialized' || /already.*init/i.test(e?.message ?? '')) {
      playerReady = true;
    }
  }
}

/**
 * Fire-and-forget speak.
 */
function speak(text: string, options?: { lang?: string; voice?: string; rate?: string }) {
  speakAsync(text, options).catch(() => {});
}

/**
 * Play TTS audio and return a promise that resolves when playback finishes.
 * Uses TrackPlayer so audio continues in background with a media notification.
 */
async function speakAsync(
  text: string,
  options?: { lang?: string; voice?: string; rate?: string },
): Promise<void> {
  if (!text?.trim()) return;
  await cancel();
  cancelFlag = false;
  speaking = true;

  try {
    await setup();

    const url = ttsService.buildSpeakUrl(
      text,
      options?.lang || 'ko-KR',
      options?.voice,
      options?.rate,
    );

    await TrackPlayer.reset();
    await TrackPlayer.add({
      id: `tts-${Date.now()}`,
      url,
      title: text.slice(0, 60),
      artist: 'Lingo Booth',
    });

    if (cancelFlag) {
      await TrackPlayer.reset();
      speaking = false;
      return;
    }

    await TrackPlayer.play();

    // Wait for playback to end or cancellation
    await new Promise<void>((resolve) => {
      let done = false;
      const finish = () => {
        if (done) return;
        done = true;
        clearInterval(cancelCheck);
        endSub.remove();
        errSub.remove();
        resolve();
      };

      const { Event } = require('react-native-track-player');
      const endSub = TrackPlayer.addEventListener(Event.PlaybackQueueEnded, finish);
      const errSub = TrackPlayer.addEventListener(Event.PlaybackError, finish);
      const cancelCheck = setInterval(() => {
        if (cancelFlag) finish();
      }, 100);
    });
  } catch {
    // Network or playback error — silent
  } finally {
    speaking = false;
  }
}

/**
 * Speak the text multiple times with a pause between repetitions.
 */
async function speakRepeat(
  text: string,
  times: number,
  options?: { lang?: string; voice?: string; rate?: string },
): Promise<void> {
  for (let i = 0; i < times; i++) {
    if (cancelFlag) return;
    await speakAsync(text, options);
    if (i < times - 1) await waitAudio(400);
  }
}

/**
 * Wait for the specified duration.
 */
async function waitAudio(ms: number): Promise<void> {
  if (cancelFlag) return;
  return new Promise((resolve) => {
    const timer = setTimeout(resolve, ms);
    const checkCancel = setInterval(() => {
      if (cancelFlag) {
        clearTimeout(timer);
        clearInterval(checkCancel);
        resolve();
      }
    }, 100);
    setTimeout(() => clearInterval(checkCancel), ms + 50);
  });
}

/**
 * Stop any ongoing playback.
 */
async function cancel(): Promise<void> {
  cancelFlag = true;
  if (playerReady) {
    try {
      await TrackPlayer.reset();
    } catch {}
  }
  speaking = false;
}

function isSpeaking(): boolean {
  return speaking;
}

/**
 * Update the notification metadata (card info) without interrupting playback.
 */
async function updateNotification(title: string, artist: string): Promise<void> {
  if (!playerReady) return;
  try {
    await TrackPlayer.updateNowPlayingMetadata({ title, artist });
  } catch {}
}

const speechService = {
  setup,
  speak,
  speakAsync,
  speakRepeat,
  waitAudio,
  cancel,
  isSpeaking,
  updateNotification,
};

export default speechService;
