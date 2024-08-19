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
) => Promise<Response> | Response | void;
