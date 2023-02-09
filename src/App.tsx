import { ApolloClient, ApolloProvider, InMemoryCache, useQuery } from "@apollo/client";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NextLaunchDocument } from "./queries";

const client = new ApolloClient({
  uri: "https://spacex-production.up.railway.app",
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <HomeScreen />
    </ApolloProvider>
  );
}

function HomeScreen() {
  const result = useQuery(NextLaunchDocument);

  return (
    <View style={styles.container}>
      <Text>
        Next mission: {result.loading ? "Loading" : result.data?.launchNext?.mission_name}
      </Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
