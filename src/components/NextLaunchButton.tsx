import { useQuery } from "@apollo/client";
import { useMemo } from "react";
import { LaunchListDocument } from "../queries";
import { isDefined } from "../utils";
import { Button } from "./Button";
import { Link } from "./Link";
import { Text } from "./Text";

export function NextLaunchButton({ currentLaunchId }: { currentLaunchId: string }) {
  // at this point in time, the api does not support filtering which means we have to do it on the client
  const result = useQuery(LaunchListDocument);
  const launches = useMemo(
    () => result.data?.launches?.filter(isDefined) ?? [],
    [result.data?.launches]
  );
  const nextLaunch = useMemo(() => {
    const currentLaunch = launches.find(({ id }) => id == currentLaunchId);
    if (!currentLaunch) return undefined;
    let nextLaunch = undefined as typeof currentLaunch | undefined;
    for (const launch of launches) {
      if (
        Number(launch.launch_date_unix) > Number(currentLaunch?.launch_date_unix) &&
        (!nextLaunch || Number(nextLaunch.launch_date_unix) > Number(launch.launch_date_unix))
      )
        nextLaunch = launch;
    }
    return nextLaunch;
  }, [launches, currentLaunchId]);

  return (
    <Link asChild href={`/launch/${nextLaunch?.id}`}>
      <Button label="Next Launch" />
    </Link>
  );
}
