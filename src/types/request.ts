import type { ServerWebSocket } from "bun";

export type SearchParams = Record<string, string>;
export type PathParams = Record<string, any>;

export interface Req extends Request {
  search: SearchParams;
  userId?: any;
  params: PathParams;
  json: any;
}

export type RequestHandler = (
  request: Req
) => Promise<Response | void> | Response | void;

export type WebSocketHandlers = (
  wsClient: ServerWebSocket<{ req: Req; handlers: WebSocketHandlers[] }>
) => Promise<void | string> | (void | string);
