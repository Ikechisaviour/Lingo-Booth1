import { Audio } from 'expo-av';
import { ttsService } from './api';

let sound: Audio.Sound | null = null;
let speaking = false;
let cancelFlag = false;
let audioReady = false;

/**
 * Configure audio mode once. Safe to call multiple times.
 */
async function setup(): Promise<void> {
  if (audioReady) return;
  try {
    await Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      staysActiveInBackground: true,
      shouldDuckAndroid: true,
    });
    audioReady = true;
  } catch {}
}

/**
 * Fire-and-forget speak.
 */
function speak(text: string, options?: { lang?: string; voice?: string; rate?: string }) {
  speakAsync(text, options).catch(() => {});
}

/**
 * Play TTS audio and return a promise that resolves when playback finishes.
 * Uses expo-av for audio playback with background support.
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

    const { sound: newSound } = await Audio.Sound.createAsync(
      { uri: url },
      { shouldPlay: true },
    );
    sound = newSound;

    if (cancelFlag) {
      await cleanup();
      speaking = false;
      return;
    }

    // Wait for playback to end or cancellation
    await new Promise<void>((resolve) => {
      let done = false;
      const finish = () => {
        if (done) return;
        done = true;
        clearInterval(cancelCheck);
        resolve();
      };

      newSound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) {
          finish();
        }
      });

      const cancelCheck = setInterval(() => {
        if (cancelFlag) finish();
      }, 100);
    });
  } catch {
    // Network or playback error — silent
  } finally {
    await cleanup();
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
 * Unload the current sound instance.
 */
async function cleanup(): Promise<void> {
  if (sound) {
    try {
      await sound.unloadAsync();
    } catch {}
    sound = null;
  }
}

/**
 * Stop any ongoing playback.
 */
async function cancel(): Promise<void> {
  cancelFlag = true;
  await cleanup();
  speaking = false;
}

function isSpeaking(): boolean {
  return speaking;
}

/**
 * Update the notification metadata — no-op with expo-av.
 */
async function updateNotification(_title: string, _artist: string): Promise<void> {}

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
