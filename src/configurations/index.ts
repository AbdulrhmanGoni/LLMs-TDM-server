import databaseConnection from "./databaseConnection";

export default async function configurations() {
  return Promise.all([databaseConnection()]);
}
