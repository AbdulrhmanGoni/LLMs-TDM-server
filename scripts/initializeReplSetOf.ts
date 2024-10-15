import { $ } from "bun";

export default async function initializeReplSetOf(
  containerName: string,
  configFileName: string
) {
  let tries = 5;
  while (tries--) {
    try {
      await $`docker exec ${containerName} mongosh --quiet --file scripts/initializingReplSetScript.js ${configFileName}`;
      return;
    } catch {
      if (tries === 0) {
        throw new Error(
          `Failed to initialize the replica set with config file "${configFileName}" that "${containerName}" container is a member in it ❌`
        );
      }
      await $`sleep 2`;
    }
  }
}
