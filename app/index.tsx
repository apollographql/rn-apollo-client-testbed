import { useQuery } from "@apollo/client";
import { Stack } from "expo-router";
import { Text, Card, Box, Link } from "../src/components";
import { NextLaunchDocument } from "../src/queries";

export default function Home() {
  const result = useQuery(NextLaunchDocument);
  return (
    <>
      <Stack.Screen options={{ title: "Home Page" }} />
      <Box variant="page">
        <Text variant="heading1">Apollo Client Testbed</Text>
        <Card variant="primary">
          <Text variant="heading2">Next ApolloX mission</Text>
          {result.loading ? (
            <Text>loading...</Text>
          ) : (
            <>
              <Text>Mission: {result.data?.launchNext?.mission_name}</Text>
              <Text>Date: {result.data?.launchNext?.launch_date_unix}</Text>
              <Text>Site: {result.data?.launchNext?.launch_site?.site_name}</Text>
              <Link href={`/launch/${result.data?.launchNext?.id}`}>Details</Link>
            </>
          )}
        </Card>
        <Box flexGrow={1} justifyContent="flex-end">
          <Link href={`/launch`}>See all launches</Link>
        </Box>
      </Box>
    </>
  );
}
