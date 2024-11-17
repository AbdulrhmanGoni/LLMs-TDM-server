import { $ } from "bun";

export default async function addShardsToMongosRouter() {
  let tries = 5;
  while (tries--) {
    try {
      await $`docker exec db-router1 mongosh --file scripts/addShardsToRouter.js`;
      return;
    } catch {
      if (tries === 0) {
        throw new Error("Failed to add shards to mongos router");
      }
      await $`sleep 2`;
    }
  }
}
