export default function SuccessResponse(
  data?: Record<string, any> | string | boolean,
  message?: string,
  statusCode: number = 200,
  statusText: string = "success"
): Response {
  return Response.json({ data, message }, { status: statusCode, statusText });
}
