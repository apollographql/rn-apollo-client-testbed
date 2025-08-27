import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { Defer20220824Handler } from "@apollo/client/incremental";
import { LocalState } from "@apollo/client/local-state";
import { ApolloProvider } from "@apollo/client/react";
import { ThemeProvider } from "@shopify/restyle";
import { Stack } from "expo-router";
import theme from "@/src/components/theme";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { useFonts } from "expo-font";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: "https://main--spacex-l4uc6p.apollographos.net/graphql",
  }),
  localState: new LocalState({}),
  incrementalHandler: new Defer20220824Handler(),
});

if (__DEV__) {
  // init devtools
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
            initialRouteName="index"
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
