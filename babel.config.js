module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./"],
          alias: {
            "@": "./src",
            "@theme": "./src/core/theme",
            "@constants": "./src/core/constants",
            "@utils": "./src/core/utils",
            "@entities": "./src/domain/entities",
            "@value-objects": "./src/domain/value-objects",
            "@interfaces": "./src/domain/repositories",
            "@interfaces-services": "./src/domain/services",
            "@services": "./src/infrastructure/services",
            "@mocks": "./src/infrastructure/mocks",
            "@repositories": "./src/infrastructure/repositories",
            "@mappers": "./src/infrastructure/mappers",
            "@persistence": "./src/infrastructure/persistence",
            "@use-cases": "./src/application/use-cases",
            "@dtos": "./src/application/dtos",
            "@components": "./src/presentation/shared/components",
            "@hooks": "./src/presentation/shared/hooks",
            "@assets": "./src/presentation/shared/assets",
            "@features": "./src/presentation/features",
            "@navigation": "./src/presentation/navigation",
            "@store": "./src/presentation/store",
          },
        },
      ],
      "react-native-reanimated/plugin",
    ],
  };
};