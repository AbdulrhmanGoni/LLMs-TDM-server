import { createClerkClient, type ClerkClient } from "@clerk/backend";
import ErrorResponse from "../utilities/ErrorResponse";
import InternalServerErrorResponse from "../utilities/InternalServerErrorResponse";
import type { Req } from "../types/request";

const clerkClient =
  process.env.NODE_ENV !== "test" &&
  createClerkClient({
    secretKey: process.env.CLERK_SECRET_KEY,
    publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
  });

export default async function authentication(request: Req) {
  if (process.env.NODE_ENV === "test") {
    request.userId = process.env.TESTING_USER_ID;
    return;
  }

  try {
    const { isSignedIn, toAuth } = await (
      clerkClient as ClerkClient
    ).authenticateRequest(request, {
      jwtKey: process.env.CLERK_JWT_KEY,
      authorizedParties: [process.env.CLIENT_ORIGIN],
    });

    if (isSignedIn) {
      const authObject = toAuth() as SignedInAuthObject & { userPrimaryEmail: string };
      request.userId = authObject.userPrimaryEmail;
    } else {
      return ErrorResponse("You are not authorized", 401);
    }
  } catch {
    return InternalServerErrorResponse();
  }
}
