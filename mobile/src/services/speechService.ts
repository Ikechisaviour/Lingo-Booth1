import { Audio } from 'expo-av';
import { ttsService } from './api';

let currentSound: Audio.Sound | null = null;
let speaking = false;
let cancelFlag = false;

async function ensureAudioMode() {
  await Audio.setAudioModeAsync({
    playsInSilentModeIOS: true,
    staysActiveInBackground: true,
    shouldDuckAndroid: true,
  });
}

/**
 * Play TTS audio from the backend for the given text.
 * Fire-and-forget — returns immediately.
 */
function speak(text: string, options?: { lang?: string; voice?: string; rate?: string }) {
  speakAsync(text, options).catch(() => {});
}

/**
 * Play TTS audio and return a promise that resolves when playback finishes.
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
    await ensureAudioMode();
    const url = ttsService.buildSpeakUrl(
      text,
      options?.lang || 'ko-KR',
      options?.voice,
      options?.rate,
    );

    const { sound } = await Audio.Sound.createAsync(
      { uri: url },
      { shouldPlay: true },
    );
    currentSound = sound;

    if (cancelFlag) {
      await sound.unloadAsync();
      speaking = false;
      return;
    }

    await new Promise<void>((resolve) => {
      sound.setOnPlaybackStatusUpdate((status) => {
        if (!status.isLoaded) {
          resolve();
        } else if (status.didJustFinish) {
          resolve();
        }
      });
    });

    await sound.unloadAsync();
  } catch {
    // Network error or playback error — silent
  } finally {
    currentSound = null;
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
 * Wait for the specified duration. Unlike setTimeout, this uses Audio
 * to keep the app active when in background.
 */
async function waitAudio(ms: number): Promise<void> {
  if (cancelFlag) return;
  return new Promise((resolve) => {
    const timer = setTimeout(resolve, ms);
    // If cancelled during wait, resolve immediately
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
  if (currentSound) {
    try {
      await currentSound.stopAsync();
      await currentSound.unloadAsync();
    } catch {}
    currentSound = null;
  }
  speaking = false;
}

function isSpeaking(): boolean {
  return speaking;
}

const speechService = {
  speak,
  speakAsync,
  speakRepeat,
  waitAudio,
  cancel,
  isSpeaking,
};

export default speechService;
