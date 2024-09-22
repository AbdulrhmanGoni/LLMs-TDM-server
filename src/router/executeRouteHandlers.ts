import type { Req, RequestHandler } from "../types/request";
import globalMiddlewares from "../middlewares/globalMiddlewares";

export default async function executeRouteHandlers(
  request: Req,
  handlers: RequestHandler[]
): Promise<Response | void> {
  for (let i = 0; i < globalMiddlewares.length; i++) {
    const handler = globalMiddlewares[i];
    const response = await handler(request);
    if (response !== undefined) {
      return response;
    }
  }

  for (let i = 0; i < handlers.length; i++) {
    const handler = handlers[i];
    const response = await handler(request);
    if (response !== undefined) {
      return response;
    }
  }
}
