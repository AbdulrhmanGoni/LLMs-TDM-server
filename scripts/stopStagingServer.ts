import { $ } from "bun";

await $`docker stack rm llms-tdm-staging`;
await $`docker compose -f docker-compose-stage-mongodb.yaml down`.env({ ENVIRONMENT_NETWORK: "staging-network" });
await $`docker service rm registry`;
