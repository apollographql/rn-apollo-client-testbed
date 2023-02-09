import { useQuery } from "@apollo/client";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NextLaunchDocument } from "../src/queries";

export default function Home() {
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
