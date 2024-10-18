import app from "../src/app";
import TestingRequest from "./lib/TestingRequest";

const server = await app().then((fetch) => {
  // @ts-ignore
  const server = Bun.serve({
    fetch,
    port: import.meta.env.PORT,
  });
  return server;
});

export const request = new TestingRequest(server);
