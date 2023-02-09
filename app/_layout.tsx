import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { Stack } from "expo-router";

const client = new ApolloClient({
  uri: "https://spacex-production.up.railway.app",
  cache: new InMemoryCache(),
});

export default function Layout() {
  return (
    <ApolloProvider client={client}>
      <Stack />
    </ApolloProvider>
  );
}
