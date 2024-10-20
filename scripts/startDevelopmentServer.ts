import { $ } from "bun";
import initializeReplSetOf from "./initializeReplSetOf";

await $`docker compose -f docker-compose-dev-mongodb.yaml up -d`;

await initializeReplSetOf("primary-dev-db", "developmentReplSetConfig");

await $`bun docker:dev`;
