import { $ } from "bun";
import initializeMongodbReplSet from "./initializeMongodbReplSet.js";

await $`docker-compose -f docker-compose-dev-mongodb.yaml up -d`;

await initializeMongodbReplSet("primary-dev-db");

await $`bun start:dev`;
