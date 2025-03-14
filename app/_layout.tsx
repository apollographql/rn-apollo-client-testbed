import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";
import { tap } from "rxjs";
import { ThemeProvider } from "@shopify/restyle";
import { Stack } from "expo-router";
import theme from "../src/components/theme";
import { connectApolloClientToVSCodeDevTools } from "@apollo/client-devtools-vscode";
import { Platform } from "react-native";

import "react-native-polyfill-globals/auto";

const client = new ApolloClient({
  link: new ApolloLink((operation, forward) => {
    console.log(`Starting request for ${operation.operationName}`);
    return forward(operation).pipe(
      tap({
        next(value) {
          console.log(
            `Received response for ${operation.operationName}:`,
            value
          );
        },
        error(err) {
          console.error(
            `Error occurred during request for ${operation.operationName}:`,
            err
          );
        },
        complete() {
          console.log(`Completed request for ${operation.operationName}`);
        },
      })
    );
  }).concat(
    new HttpLink({
      uri: "https://main--spacex-l4uc6p.apollographos.net/graphql",
      fetchOptions: {
        reactNative: { textStreaming: true },
      },
    })
  ),
  cache: new InMemoryCache(),
  devtools: {
    name: `SpaceX launches (${Platform.OS == "android" ? "Android" : "iOS"})`,
  },
});

if (__DEV__) {
  loadErrorMessages();
  loadDevMessages();
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
