import ErrorResponse from "./ErrorResponse";

export default function InternalServerErrorResponse(
  message: string = "Unexpected internal server error"
) {
  return ErrorResponse(message, 500);
}
