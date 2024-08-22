export default function ErrorResponse(
  response: Record<string, any> | string,
  statusCode: number = 400,
  statusText?: string
): Response {
  const isMessage = typeof response === "string";

  return Response.json(
    {
      message: isMessage ? response : undefined,
      error: isMessage ? undefined : response,
    },
    {
      status: statusCode,
      statusText,
    }
  );
}
