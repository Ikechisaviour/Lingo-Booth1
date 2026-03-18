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
            force 'org.jetbrains.kotlinx:kotlinx-coroutines-core:1.7.3'
            force 'org.jetbrains.kotlinx:kotlinx-coroutines-android:1.7.3'
        }
    }
}

subprojects {
    afterEvaluate { project ->
        if (project.hasProperty('android')) {
            project.android {
                compileSdkVersion 35
            }
        }
    }
}
`;
  if (!content.includes('allprojects {')) {
    return content + forceVersionScript;
  }
  return content;
}
