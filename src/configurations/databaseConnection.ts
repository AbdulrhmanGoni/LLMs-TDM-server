import mongoose from "mongoose";
import loggerService from "../services/logger";

export default async function databaseConnection() {
  try {
    await mongoose.connect(import.meta.env.DB_URL);
    console.log("The server connected to the database successfully ✅");
  } catch (error: any) {
    const message =
      "The server failed to connect to the database ❌: " + error?.message;

    loggerService.error(message, {
      operation: "Database Connection",
    });

    throw new Error(message);
  }
}
