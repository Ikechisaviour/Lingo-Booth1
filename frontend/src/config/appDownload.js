// Android app (APK) download configuration.
//
// Set REACT_APP_ANDROID_APK_URL at build time to a hosted URL (recommended —
// e.g. a GitHub Release asset or a CDN/object-storage link). If unset, it falls
// back to a static file served from the site's own /public/downloads folder.
// Drop the release build there as `lingobooth.apk` to use the fallback.
export const ANDROID_APK_URL =
  process.env.REACT_APP_ANDROID_APK_URL || '/downloads/lingobooth.apk';

// Filename hint for the browser's download prompt (honored for same-origin URLs).
export const ANDROID_APK_FILENAME = 'lingobooth-android.apk';

// Lightweight Android detection (for tailoring copy only — not security).
export function isAndroidDevice() {
  if (typeof navigator === 'undefined') return false;
  return /android/i.test(navigator.userAgent || '');
}
