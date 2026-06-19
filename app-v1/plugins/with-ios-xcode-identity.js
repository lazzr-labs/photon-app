const { withInfoPlist, withXcodeProject } = require('expo/config-plugins');

const supportedOrientations = [
  'UIInterfaceOrientationPortrait',
  'UIInterfaceOrientationPortraitUpsideDown',
  'UIInterfaceOrientationLandscapeLeft',
  'UIInterfaceOrientationLandscapeRight',
];

function withIosXcodeIdentity(config) {
  const appCategory = config.ios?.infoPlist?.LSApplicationCategoryType;
  const buildNumber = config.ios?.buildNumber;
  const displayName = config.ios?.infoPlist?.CFBundleDisplayName ?? config.name;
  const version = config.ios?.version ?? config.version;

  config = withInfoPlist(config, (config) => {
    config.modResults.CFBundleDisplayName = displayName;
    config.modResults.CFBundleShortVersionString = version;
    config.modResults.CFBundleVersion = buildNumber;
    config.modResults.LSApplicationCategoryType = appCategory;
    config.modResults.UISupportedInterfaceOrientations = supportedOrientations;
    config.modResults['UISupportedInterfaceOrientations~ipad'] = supportedOrientations;

    return config;
  });

  return withXcodeProject(config, (config) => {
    const configurations = config.modResults.pbxXCBuildConfigurationSection();

    for (const key of Object.keys(configurations)) {
      const buildSettings = configurations[key]?.buildSettings;

      if (!buildSettings?.PRODUCT_BUNDLE_IDENTIFIER) {
        continue;
      }

      buildSettings.CURRENT_PROJECT_VERSION = buildNumber;
      buildSettings.INFOPLIST_KEY_CFBundleDisplayName = displayName;
      buildSettings.INFOPLIST_KEY_LSApplicationCategoryType = `"${appCategory}"`;
      buildSettings.MARKETING_VERSION = version;
    }

    return config;
  });
}

module.exports = withIosXcodeIdentity;
