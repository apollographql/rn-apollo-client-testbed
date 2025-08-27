import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { Defer20220824Handler } from "@apollo/client/incremental";
import { LocalState } from "@apollo/client/local-state";
import { ApolloProvider } from "@apollo/client/react";
import { ThemeProvider } from "@shopify/restyle";
import { Stack } from "expo-router";
import theme from "@/components/theme";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { useFonts } from "expo-font";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { connectApolloClientToVSCodeDevTools } from "@apollo/client-devtools-vscode";
import { Platform } from "react-native";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: "https://main--spacex-l4uc6p.apollographos.net/graphql",
  }),
  localState: new LocalState({}),
  incrementalHandler: new Defer20220824Handler(),
  devtools: {
    enabled: __DEV__,
    name: `Apollo Client Testbed (${Platform.OS})`,
  },
});
if (__DEV__) {
  // set up the Apollo Client VSCode DevTools connection
  // see https://www.apollographql.com/docs/react/development-testing/developer-tooling#apollo-client-devtools-in-vs-code
  try {
    if (Platform.OS === "android") {
      // in the Android emulator, "10.0.2.2" points to the host machine
      // if you are using a physical device, you might need to replace this
      // with `127.0.0.` and set up port forwarding
      connectApolloClientToVSCodeDevTools(client, "ws://10.0.2.2:7095");
    } else if (Platform.OS === "ios") {
      connectApolloClientToVSCodeDevTools(client, "ws://localhost:7095");
    }
    // in web, just use the browser devtools, no need for the VSCode DevTools
  } catch (e) {
    console.warn("Could not connect to Apollo Client VSCode DevTools", e);
  }
}

export default function Layout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <StatusBar
          style="auto"
          backgroundColor={theme.colors.alternativeBackground}
        />
        <GestureHandlerRootView>
          <Stack
            screenOptions={{
              headerStyle: {
                backgroundColor: theme.colors.alternativeBackground,
              },
              headerTitleStyle: {
                color: theme.colors.secondaryText,
              },
            }}
          />
        </GestureHandlerRootView>
      </ThemeProvider>
    </ApolloProvider>
  );
}
