import { createClerkClient } from "@clerk/backend";
import ErrorResponse from "../utilities/ErrorResponse";
import InternalServerErrorResponse from "../utilities/InternalServerErrorResponse";
import type { Req } from "../types/request";

export default async function authentication(request: Req) {
  try {
    const clerkClient = createClerkClient({
      secretKey: process.env.CLERK_SECRET_KEY,
      publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
    });

    const { isSignedIn, toAuth } = await clerkClient.authenticateRequest(
      request,
      {
        jwtKey: process.env.CLERK_JWT_KEY,
        authorizedParties: [process.env.CLIENT_ORIGIN],
      }
    );

    if (isSignedIn) {
      const authObject = toAuth();
      request.userId = authObject.userId;
    } else {
      return ErrorResponse("You are not authorized", 401);
    }
  } catch {
    return InternalServerErrorResponse();
  }
}
