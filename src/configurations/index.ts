import databaseConnection from "./databaseConnection";
import setUpRecentActivitiesDocument from "./setUpRecentActivitiesDocument";

export default async function configurations() {
  return Promise.all([databaseConnection(), setUpRecentActivitiesDocument()]);
}
