# Android APK download

The "Download Android App" button (landing nav + logged-in home banner) points at
the URL from `frontend/src/config/appDownload.js`:

    ANDROID_APK_URL = process.env.REACT_APP_ANDROID_APK_URL || '/downloads/lingobooth.apk'

You have two options to make the button work:

## Option A — host the APK elsewhere (recommended)
Upload the release APK to a durable host (GitHub Release asset, S3/R2, or any CDN)
and set the env var at build time:

    REACT_APP_ANDROID_APK_URL=https://.../lingobooth.apk

Hosting externally keeps large binaries out of the git repo and off the web build.
Make sure the host serves it as a download (GitHub Releases and most object stores do).

## Option B — serve it from this folder
Drop the release build here as **`lingobooth.apk`**:

    frontend/public/downloads/lingobooth.apk

It will be served at `/downloads/lingobooth.apk` and the button will download it
(the `download` attribute forces a download for same-origin files).

> Note: committing a multi-MB APK to git is discouraged; prefer Option A for production.
> This folder is kept in the repo via this README so the path exists.
