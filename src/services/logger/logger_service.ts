import { appendFile } from "node:fs/promises";
import type { LogDetails } from "../../types/logging";

export default async function logger_service(log: LogDetails) {
  const timestamp = new Date().toISOString();
  if (
    process.env.NODE_ENV !== "production" &&
    process.env.MUTE_LOGS !== "true"
  ) {
    console.log(`${timestamp} [${log.level}] "${log.message}"`);
  }

  const logLine = JSON.stringify({ timestamp, ...log }) + "\n";

  await appendFile("logs/combine.log", logLine);

  log.level === "error" && (await appendFile("logs/errors.log", logLine));
}
