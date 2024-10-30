import app from "./app";
import websocketRequestsHandlers from "./websocketRequestsHandlers";

try {
  const serve = await app();
  const server = Bun.serve({
    fetch: serve,
    port: import.meta.env.PORT,
    websocket: websocketRequestsHandlers,
    // @ts-ignore
    static: {
      "/api/health-check": new Response("Everything is good!"),
    },
  });
  console.log("server running on:", server.url.href, "🚀");
} catch (error: any) {
  console.error("server failed to run successfully ❌");
  console.error(error?.message);
}
