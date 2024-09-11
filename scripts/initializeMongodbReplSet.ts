import { execSync } from "child_process";

export default async function initializeMongodbReplSet(containerName: string) {
  return new Promise<void>((resolve, reject) => {
    let tries = 5;
    let intervalId: Timer;
    intervalId = setInterval(() => {
      if (tries) {
        try {
          tries--;
          console.log("The try", tries);
          execSync(
            `docker exec ${containerName} mongosh --file scripts/initializingReplSetScript.js`,
            { stdio: "inherit" }
          );
          clearInterval(intervalId);
          resolve();
        } catch (e) {
          console.log("Failed to connect to the primary database");
          console.log("Retrying...\n");
        }
      } else {
        reject();
        clearInterval(intervalId);
        process.exit(1);
      }
    }, 2000);
  });
}
