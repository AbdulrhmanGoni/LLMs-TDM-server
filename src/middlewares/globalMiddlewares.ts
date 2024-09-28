import type { RequestHandler, WebSocketHandlers } from "../types/request";
import authentication from "./authentication";
import webSocketAuthentication from "./webSocketAuthentication";

const globalMiddlewares: RequestHandler[] = [authentication];

export const websocketGlobalMiddlewares: WebSocketHandlers[] = [
  webSocketAuthentication,
];

export default globalMiddlewares;
