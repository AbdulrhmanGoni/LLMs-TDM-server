import { createClerkClient, type ClerkClient } from "@clerk/backend";
import ErrorResponse from "../utilities/ErrorResponse";
import InternalServerErrorResponse from "../utilities/InternalServerErrorResponse";
import type { Req } from "../types/request";

if (process.env.NODE_ENV === "staging" || process.env.NODE_ENV === "production") {
  process.env.CLERK_JWT_KEY = process.env.CLERK_JWT_KEY?.replaceAll(/("|\\n)/g, (char) => {
    if (char === '\\n') return "\n";
    if (char === '"') return "";
    return char
  })
}

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
      const authObject = toAuth()
      request.userId = authObject.sessionClaims.userPrimaryEmail as string;
    } else {
      return ErrorResponse("You are not authorized", 401);
    }
  } catch {
    return InternalServerErrorResponse();
  }
}
