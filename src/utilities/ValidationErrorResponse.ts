import type { ValidationError } from "../types/validation";

export default function ValidationErrorResponse(
  errors: ValidationError[]
): Response {
  const statusCode = 403;
  return Response.json(
    {
      errors,
      statusCode,
    },
    {
      status: statusCode,
      statusText: "ValidationError",
    }
  );
}
