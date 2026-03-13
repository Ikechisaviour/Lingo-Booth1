const { withProjectBuildGradle } = require('@expo/config-plugins');

module.exports = function withAndroidFixes(config) {
  return withProjectBuildGradle(config, (config) => {
    if (config.modResults.language === 'groovy') {
      config.modResults.contents = fixBuildGradle(config.modResults.contents);
    }
    return config;
  });
};

function fixBuildGradle(content) {
  const forceVersionScript = `
allprojects {
    ext {
        compileSdkVersion = 35
        targetSdkVersion = 35
        buildToolsVersion = "35.0.0"
    }
    configurations.all {
        resolutionStrategy {
            force 'androidx.core:core:1.13.1'
            force 'androidx.core:core-ktx:1.13.1'
        }
    }
}
`;
  if (!content.includes('allprojects {')) {
    return content + forceVersionScript;
  }
  return content;
}
