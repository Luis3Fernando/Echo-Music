module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@': './src',
            '@components': './src/components',
            '@features': './src/features',
            '@navigation': './src/navigation',
            '@theme': './src/theme',
            '@assets': './assets',
          },
        },
      ],
    ],
  };
};