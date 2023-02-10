import { useQuery } from "@apollo/client";
import { Stack, useLocalSearchParams, useSegments } from "expo-router";
import { Box, Link, NextLaunchButton, Text } from "../../src/components";
import { LaunchDetailDocument } from "../../src/queries";

export default function LaunchDetails() {
  const { id } = useLocalSearchParams();
  const result = useQuery(LaunchDetailDocument, { variables: { id } });
  const launch = result.data?.launch;
  return (
    <>
      <Stack.Screen options={{ title: launch?.mission_name ?? "Mission Details" }} />
      <Box variant="page">
        {!launch ? (
          <Text>loading</Text>
        ) : (
          <>
            <Text variant="heading1">{launch.mission_name}</Text>
            <Text>{launch.details}</Text>
            <Text>
              Planned launch:{new Date(launch.launch_date_unix * 1000).toLocaleDateString()}
            </Text>
            {launch.upcoming ? <></> : <Text>Launch successful: {launch.launch_success}</Text>}
            <Text>
              Rocket: {launch.rocket?.rocket_name} ({launch.rocket?.rocket_type})
            </Text>
            <Text>{launch.links?.wikipedia}</Text>
          </>
        )}
        <Box flexGrow={1} justifyContent="flex-end">
          {launch?.id && <NextLaunchButton currentLaunchId={launch.id} />}
          <Link href={`./`}>See all missions</Link>
        </Box>
      </Box>
    </>
  );
}
