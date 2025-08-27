import { useQuery } from "@apollo/client/react";
import {
  Stack,
  useLocalSearchParams,
  type ExternalPathString,
} from "expo-router";
import { Box, Link, NextLaunchButton, Text } from "@/components";
import { LaunchDetailDocument } from "@/queries";
export default function LaunchDetails() {
  const { id } = useLocalSearchParams<"/launch/[id]">();

  const result = useQuery(LaunchDetailDocument, {
    variables: { id },
  });
  const launch = result.data?.launch;
  return (
    <>
      <Stack.Screen
        options={{ title: launch?.mission_name ?? "Mission Details" }}
      />
      <Box variant="page">
        {!launch ? (
          <Text>loading</Text>
        ) : (
          <>
            <Text variant="heading1">{launch.mission_name}</Text>
            <Text>{launch.details}</Text>
            <Text>
              Planned launch:
              {new Date(launch.launch_date_unix * 1000).toLocaleDateString()}
            </Text>
            {launch.upcoming ? (
              <></>
            ) : (
              <Text>Launch successful: {launch.launch_success}</Text>
            )}
            <Text>
              Rocket: {launch.rocket?.rocket_name} ({launch.rocket?.rocket_type}
              )
            </Text>
            {launch.links?.wikipedia ? (
              <Link href={launch.links?.wikipedia as ExternalPathString}>
                {launch.links?.wikipedia}
              </Link>
            ) : undefined}
          </>
        )}
        <Box flexGrow={1} justifyContent="flex-end" rowGap="s">
          {launch?.id && <NextLaunchButton currentLaunchId={launch.id} />}
          <Link href={`./`}>See all missions</Link>
        </Box>
      </Box>
    </>
  );
}
