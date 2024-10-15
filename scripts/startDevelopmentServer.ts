import { $ } from "bun";
import initializeReplSetOf from "./initializeReplSetOf.js";

await $`docker-compose -f docker-compose-dev-mongodb.yaml up -d`;

await initializeReplSetOf("primary-dev-db", "devAndTestReplSetConfig");

await $`bun docker:dev`;
