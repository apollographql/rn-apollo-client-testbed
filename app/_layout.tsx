import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { Defer20220824Handler } from "@apollo/client/incremental";
import { LocalState } from "@apollo/client/local-state";
import { ApolloProvider } from "@apollo/client/react";
import { ThemeProvider } from "@shopify/restyle";
import { Stack } from "expo-router";
import theme from "../src/components/theme";
import { StatusBar } from "expo-status-bar";

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
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <StatusBar
          style="auto"
          backgroundColor={theme.colors.alternativeBackground}
        />
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
      </ThemeProvider>
    </ApolloProvider>
  );
}
