import { verifyToken } from "@clerk/backend";
import type { WsClient } from "../types/request";

export default async function webSocketAuthentication(ws: WsClient) {
  try {
    if (ws.data.req.search.auth) {
      const payload = await verifyToken(ws.data.req.search.auth, {
        jwtKey: process.env.CLERK_JWT_KEY,
      });

      if (payload) {
        ws.data.req.userId = payload.sub;
      }
    }
  } catch {
    return "You are not authorized";
  }
}
