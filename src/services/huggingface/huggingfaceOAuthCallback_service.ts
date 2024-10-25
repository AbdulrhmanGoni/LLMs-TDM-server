import type { HuggingfaceService } from ".";
import operationsResultsMessages from "../../constants/operationsResultsMessages";
import ServiceOperationResult from "../../utilities/ServiceOperationResult";
import { getHuggingfaceAccessTokens } from "./huggingFaceOAuthTokenRequests";

export default async function huggingfaceOAuthCallback_service(
  this: HuggingfaceService,
  userId: string,
  code: string
) {
  try {
    const gettingTokenResponse = await getHuggingfaceAccessTokens(code);

    if (gettingTokenResponse.success) {
      return await this.createHuggingfaceAccount(userId, {
        hfAccessToken: gettingTokenResponse.payload.access_token,
        hfRefreshToken: gettingTokenResponse.payload.refresh_token,
        accessTokenExpiresIn: gettingTokenResponse.payload.expires_in,
      });
    }

    return ServiceOperationResult.failure(
      `${gettingTokenResponse.payload.error}: ${gettingTokenResponse.payload.error_description}`
    );
  } catch (error) {
    return ServiceOperationResult.failure(
      operationsResultsMessages.failedHuggingfaceOAuthProcess
    );
  }
}
