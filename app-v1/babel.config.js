module.exports = function (api) {
  api.cache.invalidate(() => process.env.EXPO_PUBLIC_API_URL || process.env.NODE_ENV || 'development');
  return {
    presets: [
      [
        'babel-preset-expo',
        {
          jsxImportSource: 'nativewind',
        },
      ],
      'nativewind/babel',
    ],
    plugins: [],
  };
};
