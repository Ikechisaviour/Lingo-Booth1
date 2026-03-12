/**
 * Expo config plugin — adds android:supportsPictureInPicture="true" to the
 * main Activity so Android will allow the app to enter PiP mode.
 * Also appends the required configChanges so the Activity is not destroyed
 * when the PiP window is resized.
 *
 * Applied automatically during `eas build` — no changes needed in app.json
 * beyond referencing this plugin.
 */
const { withAndroidManifest } = require('@expo/config-plugins');

const PIP_CONFIG_CHANGES = 'screenLayout|smallestScreenSize|screenSize';

module.exports = function withPictureInPicture(config) {
  return withAndroidManifest(config, (config) => {
    const activities =
      config.modResults.manifest?.application?.[0]?.activity ?? [];

    for (const activity of activities) {
      const name = activity.$?.['android:name'] ?? '';
      // Target the main Expo/RN activity (ends with .MainActivity)
      if (name.endsWith('MainActivity') || name === '.MainActivity') {
        activity.$['android:supportsPictureInPicture'] = 'true';

        // Merge required configChanges without duplicating existing ones
        const existing = activity.$['android:configChanges'] ?? '';
        const needed = PIP_CONFIG_CHANGES.split('|').filter(
          (c) => !existing.includes(c),
        );
        if (needed.length > 0) {
          activity.$['android:configChanges'] = existing
            ? `${existing}|${needed.join('|')}`
            : needed.join('|');
        }
        break;
      }
    }

    return config;
  });
};
