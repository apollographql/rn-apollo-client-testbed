import { useQuery } from "@apollo/client";
import { Stack } from "expo-router";
import { useMemo } from "react";
import { FlatList } from "react-native-gesture-handler";
import { Box, Link, Pressable, Text } from "../../src/components";
import { LaunchListDocument } from "../../src/queries";

function isDefined<T>(x: T | null | undefined): x is T {
  return x != null;
}

export default function Missions() {
  const result = useQuery(LaunchListDocument);
  const launches = useMemo(
    () =>
      (result.data?.launches ?? []).filter(isDefined).map((launch) => ({
        ...launch,
        launch_date_unix: new Date(launch.launch_date_unix * 1000).toLocaleDateString(),
      })),
    [result.data?.launches]
  );
  console.log(launches);
  return (
    <>
      <Stack.Screen options={{ title: "Launch Overview" }} />
      <FlatList
        data={launches}
        refreshing={result.loading}
        onRefresh={() => result.refetch()}
        ListEmptyComponent={
          result.loading ? (
            <Box variant="centered">
              <Text>loading</Text>
            </Box>
          ) : undefined
        }
        renderItem={({ item, index }) => {
          return (
            <Link asChild href={`/launch/${item.id}`}>
              <Pressable
                flexDirection="row"
                alignItems="baseline"
                justifyContent="space-between"
                borderTopWidth={index ? 1 : 0}
                padding="s"
              >
                <Text fontSize={16}>{item.mission_name}</Text>
                <Text>{item.launch_date_unix}</Text>
              </Pressable>
            </Link>
          );
        }}
      />
    </>
  );
}
