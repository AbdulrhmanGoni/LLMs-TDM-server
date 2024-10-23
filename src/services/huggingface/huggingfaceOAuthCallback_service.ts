import type { HuggingfaceService } from ".";
import operationsResultsMessages from "../../constants/operationsResultsMessages";
import ServiceOperationResult from "../../utilities/ServiceOperationResult";

export default async function huggingfaceOAuthCallback_service(
  this: HuggingfaceService,
  userId: string,
  code: string
) {
  try {
    const payload = {
      client_id: process.env.HF_CLIENT_ID,
      client_secret: process.env.HF_CLIENT_SECRET,
      code,
      grant_type: "authorization_code",
      redirect_uri: process.env.HF_AUTH_REDIRECT_URL,
    };

    let encodedFormBody = Object.entries(payload)
      .map(
        ([key, value]) =>
          encodeURIComponent(key) + "=" + encodeURIComponent(value)
      )
      .join("&");

    const tokenResponse = await fetch("https://huggingface.co/oauth/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encodedFormBody,
    });

    const tokenResponsePayload = await tokenResponse.json();

    if (
      tokenResponse.ok &&
      tokenResponse.status === 200 &&
      tokenResponsePayload.access_token
    ) {
      return await this.createHuggingfaceAccount(
        userId,
        tokenResponsePayload.access_token,
        tokenResponsePayload.refresh_token
      );
    }

    return ServiceOperationResult.failure(
      `${tokenResponsePayload.error}: ${tokenResponsePayload.error_description}`
    );
  } catch (error) {
    return ServiceOperationResult.failure(
      operationsResultsMessages.failedHuggingfaceOAuthProcess
    );
  }
}
