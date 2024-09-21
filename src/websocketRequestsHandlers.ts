import type { WebSocketServeOptions } from "bun";
import type { Req, WebSocketHandlers } from "./types/request";

const websocketRequestsHandlers: WebSocketServeOptions<{
  req: Req;
  handlers: WebSocketHandlers[];
}>["websocket"] = {
  async open(ws) {
    for (let i = 0; i < ws.data.handlers.length; i++) {
      const websocketHandler = ws.data.handlers[i];
      const res = await websocketHandler(ws);
      if (res) {
        ws.close(4000, res);
      }
    }
  },
  message(ws, message) {},
  close(ws) {},
};

export default websocketRequestsHandlers;
