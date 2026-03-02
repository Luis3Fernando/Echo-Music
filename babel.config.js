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
            '@constants': './src/core/constants',
            '@entities':'./src/domain/entities',
            '@value-objects':'./src/domain/value-objects',
            '@mocks': './src/domain/mocks',
            '@database': './src/domain/database',
            '@repository': './src/domain/repository',
            '@hooks': './src/logic/hooks',
            '@services': './src/logic/services',
            '@state': './src/logic/state',
          },
        },
      ],
    ],
  };
};