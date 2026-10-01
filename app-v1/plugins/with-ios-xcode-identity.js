const { withInfoPlist, withXcodeProject } = require('expo/config-plugins');

const supportedOrientations = [
  'UIInterfaceOrientationPortrait',
  'UIInterfaceOrientationLandscapeLeft',
  'UIInterfaceOrientationLandscapeRight',
  'UIInterfaceOrientationPortraitUpsideDown',
];

function withIosXcodeIdentity(config) {
  const appCategory = config.ios?.infoPlist?.LSApplicationCategoryType;
  const appleTeamId = config.ios?.appleTeamId;
  const buildNumber = config.ios?.buildNumber;
  const version = config.ios?.version ?? config.version;
  const displayName = config.ios?.infoPlist?.CFBundleDisplayName ?? config.name;

  config = withInfoPlist(config, (config) => {
    config.modResults.CFBundleVersion = buildNumber;
    config.modResults.CFBundleDisplayName = displayName;
    config.modResults.CFBundleShortVersionString = version;
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
      if (appleTeamId) {
        buildSettings.DEVELOPMENT_TEAM = appleTeamId;
      }
      buildSettings.MARKETING_VERSION = version;
      buildSettings.INFOPLIST_KEY_CFBundleDisplayName = displayName;
      buildSettings.INFOPLIST_KEY_LSApplicationCategoryType = `"${appCategory}"`;
    }

    return config;
  });
}

module.exports = withIosXcodeIdentity;
