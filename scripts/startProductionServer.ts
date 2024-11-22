import { $ } from "bun";
import initializeReplSetOf from "./initializeReplSetOf.ts";
import createRootAdminIn from "./createRootAdminIn.ts";
import addShardsToMongosRouter from "./addShardsToMongosRouter.ts";

await $`docker network rm -f production-network`;

await $`docker network create --scope=swarm -d overlay --attachable production-network`;

await $`docker compose -f docker-compose-prod-mongodb.yaml up -d`;

await Promise.all([
    initializeReplSetOf("config-server1", "configsvrReplSet"),
    initializeReplSetOf("shard1-node-a", "shard1ReplSet"),
    initializeReplSetOf("shard2-node-a", "shard2ReplSet"),
    initializeReplSetOf("shard3-node-a", "shard3ReplSet"),
]);

await addShardsToMongosRouter();

await Promise.all([
    createRootAdminIn("config-server1"),
    createRootAdminIn("shard1-node-a"),
    createRootAdminIn("shard2-node-a"),
    createRootAdminIn("shard3-node-a"),
]);

const DB_ADMIN_USERNAME = process.env.DB_ADMIN_USERNAME;
const DB_ADMIN_PASSWORD = process.env.DB_ADMIN_PASSWORD;
await $`docker exec db-router1 mongosh --port 27017 -u "${DB_ADMIN_USERNAME}" -p "${DB_ADMIN_PASSWORD}" --file scripts/shardingSettingUp.js`;

await $`bun deploy:prod`;
