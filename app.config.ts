import {
  withPlugins,
  ConfigPlugin,
  withAppBuildGradle,
} from "expo/config-plugins";
import { ExpoConfig, ConfigContext } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => {
  return withPlugins(
    {
      ...config,
      name: "rn-apollo-client-testbed",
      slug: "rn-apollo-client-testbed",
      version: "1.0.49",
      orientation: "portrait",
      icon: "./assets/images/icon.png",
      userInterfaceStyle: "light",
      newArchEnabled: true,
      scheme: "rn-apollo-client-testbed",
      splash: {
        image: "./assets/images/splash-icon.png",
        resizeMode: "contain",
        backgroundColor: "#ffffff",
      },
      updates: {
        fallbackToCacheTimeout: 0,
      },
      assetBundlePatterns: ["**/*"],
      ios: {
        supportsTablet: true,
        bundleIdentifier: "apollo.prometheus.testbed",
      },
      android: {
        adaptiveIcon: {
          foregroundImage: "./assets/images/adaptive-icon.png",
          backgroundColor: "#FFFFFF",
        },
        edgeToEdgeEnabled: true,
        package: "apollo.prometheus.testbed",
      },
      web: {
        favicon: "./assets/images/favicon.png",
      },
      extra: {
        eas: {
          projectId: "0c93a498-fc0d-4e45-9e08-36399405030b",
        },
      },
      owner: "prometheus-web",
      jsEngine: "hermes",
      plugins: [
        "expo-router",
        [
          "expo-splash-screen",
          {
            image: "./assets/images/splash-icon.png",
            imageWidth: 200,
            resizeMode: "contain",
            backgroundColor: "#ffffff",
          },
        ],
      ],
      experiments: {
        typedRoutes: true,
      },
    },
    [withSourceMapsInDev]
  );
};

const withSourceMapsInDev: ConfigPlugin = (config) =>
  withAppBuildGradle(config, (config) => {
    config.modResults.contents = config.modResults.contents.replace(
      `
project.ext.react = [`,
      `
project.ext.react = [
    hermesFlagsRelease: ["-O", "-output-source-map"],
    hermesFlagsDebug: ["-O", "-output-source-map"],
`
    );
    return config;
  });
