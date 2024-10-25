import DatasetsModel from "../../models/DatasetsModel";
import ServiceOperationResult from "../../utilities/ServiceOperationResult";
import { refreshAccessToken } from "./huggingFaceOAuthTokenRequests";

export default async function refreshHuggingfaceAccessToken_service(
  userId: string,
  refreshToken: string
) {
  const refreshTokenResult = await refreshAccessToken(refreshToken);

  if (refreshTokenResult.success) {
    const updateResult = await DatasetsModel.findByIdAndUpdate(
      { _id: userId },
      {
        $set: {
          "huggingfaceAccount.accessToken":
            refreshTokenResult.payload.access_token,
          "huggingfaceAccount.accessTokenExpiresIn":
            Date.now() + refreshTokenResult.payload.expires_in * 1000,
          "huggingfaceAccount.refreshToken":
            refreshTokenResult.payload.refresh_token,
        },
      },
      { new: true }
    );

    if (updateResult) {
      return ServiceOperationResult.success(updateResult.huggingfaceAccount);
    }

    return ServiceOperationResult.failure(
      "Failed to update user's huggingface account data after refreshing access token"
    );
  }

  return ServiceOperationResult.failure(
    "Failed to refresh user's Huggingface access token"
  );
}
