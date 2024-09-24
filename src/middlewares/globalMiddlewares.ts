import type { RequestHandler } from "../types/request";
import authentication from "./authentication";

const globalMiddlewares: RequestHandler[] = [authentication];

export default globalMiddlewares;
