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
            '@components': './src/presentation/components',
            '@assets': './src/presentation/assets',
            '@features': './src/presentation/features',
            '@navigation': './src/presentation/navigation',
            '@theme': './src/core/theme',
          },
        },
      ],
    ],
  };
};