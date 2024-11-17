import { $ } from "bun";

export default async function setUpLocalDockerImagesRegistry() {
    await $`docker service create \
    --name registry \
    --limit-memory 120mb \
    --publish published=5000,target=5000 \
    registry:2`;

    await $`bun build:stage`;
    await $`bun push:stage`;

    await $`docker tag nginx:stable localhost:5000/nginx:stable`;
    await $`docker push localhost:5000/nginx:stable`;
};
