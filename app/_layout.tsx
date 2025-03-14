import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { ThemeProvider } from "@shopify/restyle";
import { Stack } from "expo-router";
import theme from "../src/components/theme";
import { connectApolloClientToVSCodeDevTools } from "@apollo/client-devtools-vscode";
import { Platform } from "react-native";

const client = new ApolloClient({
  uri: "https://main--spacex-l4uc6p.apollographos.net/graphql",
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
