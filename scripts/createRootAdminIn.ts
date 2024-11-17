import { $ } from "bun";

const DB_ADMIN_USERNAME = process.env.DB_ADMIN_USERNAME;
const DB_ADMIN_PASSWORD = process.env.DB_ADMIN_PASSWORD;

export default async function createRootAdminIn(containerName: string) {
  if (DB_ADMIN_USERNAME && DB_ADMIN_PASSWORD) {
    await $`
    docker exec -e DB_ADMIN_USERNAME="${DB_ADMIN_USERNAME}" -e DB_ADMIN_PASSWORD="${DB_ADMIN_PASSWORD}" ${containerName} mongosh --file scripts/createRootAdmin.js`;
    console.log(
      `The root admin "${DB_ADMIN_USERNAME}" created in "${containerName}" successfully ✅`
    );
  } else {
    throw `"DB_ADMIN_USERNAME" and "DB_ADMIN_PASSWORD" environment variables are not set`;
  }
}
