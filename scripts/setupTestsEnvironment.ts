import { $ } from "bun";
import initializeMongodbReplSet from "./initializeReplSetOf";
import "../tests/lib/customMatchers.ts";

await $`docker-compose -f docker-compose-test-mongodb.yaml up -d`;

await initializeMongodbReplSet("primary-test-db", "testingReplSetConfig");
