import type { ServerWebSocket } from "bun";

export type SearchParams = Record<string, string>;
export type PathParams = Record<string, any>;

export interface Req extends Request {
  search: SearchParams;
  userId: string;
  params: PathParams;
  json: any;
}

export type RequestHandler = (
  request: Req
) => Promise<Response | void> | Response | void;

export type WsClient = ServerWebSocket<{
  req: Req;
  handlers: WebSocketHandlers[];
}>;

export type WebSocketHandlers = (
  wsClient: WsClient
) => Promise<void | string> | (void | string);
