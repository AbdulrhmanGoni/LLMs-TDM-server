import mongoose from "mongoose";

export default async function databaseConnection() {
  try {
    await mongoose.connect(import.meta.env.DB_URL);
    console.log("The server connected to the database ✅");
  } catch (error: any) {
    throw new Error(
      "The server failed to connect to the database ❌: " + error?.message
    );
  }
}
