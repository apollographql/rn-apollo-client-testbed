import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { ThemeProvider } from "@shopify/restyle";
import { Stack } from "expo-router";
import theme from "../src/components/theme";
import { connectApolloClientToVSCodeDevTools } from "@apollo/client-devtools-vscode";
import { Platform } from "react-native";

import { polyfill as polyfillEncoding } from "react-native-polyfill-globals/src/encoding";
import { polyfill as polyfillReadableStream } from "react-native-polyfill-globals/src/readable-stream";

polyfillEncoding();
polyfillReadableStream();

const client = new ApolloClient({
  link: new ApolloLink((operation, forward) =>
    forward(operation).map(function logChunks(chunk) {
      console.log(chunk);
      return chunk;
    })
  ).concat(
    new HttpLink({
      uri: "https://main--spacex-l4uc6p.apollographos.net/graphql",
    })
  ),
  cache: new InMemoryCache(),
  devtools: {
    name: `SpaceX launches (${Platform.OS == "android" ? "Android" : "iOS"})`,
  },
});

if (__DEV__) {
  connectApolloClientToVSCodeDevTools(
    client,
    Platform.OS === "android" ? "ws://10.0.2.2:7095" : "ws://localhost:7095"
  );
}

export default function Layout() {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <Stack
          initialRouteName="index"
          screenOptions={{
            statusBarColor: theme.colors.alternativeBackground,
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
