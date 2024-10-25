import { whoAmI, type WhoAmIUser } from "@huggingface/hub";
import DatasetsModel from "../../models/DatasetsModel";
import ServiceOperationResult from "../../utilities/ServiceOperationResult";
import operationsResultsMessages from "../../constants/operationsResultsMessages";

type huggingfaceAccountCredentials = {
  hfAccessToken: string;
  hfRefreshToken: string;
  accessTokenExpiresIn: number;
};

export default async function createHuggingfaceAccount_service(
  userId: string,
  credentials: huggingfaceAccountCredentials
) {
  const hfUser = (await whoAmI({
    accessToken: credentials.hfAccessToken,
  })) as WhoAmIUser;

  const { modifiedCount } = await DatasetsModel.updateOne(
    { _id: userId },
    {
      $set: {
        huggingfaceAccount: {
          accessToken: credentials.hfAccessToken,
          refreshToken: credentials.hfRefreshToken,
          accessTokenExpiresIn:
            Date.now() + credentials.accessTokenExpiresIn * 1000,
          username: hfUser.name,
          emailVerified: hfUser.emailVerified,
        },
      },
    }
  );

  if (modifiedCount) {
    return ServiceOperationResult.success(
      operationsResultsMessages.successfulHuggingfaceAccountCreation
    );
  } else {
    return ServiceOperationResult.failure(
      operationsResultsMessages.failedHuggingfaceAccountCreation
    );
  }
}
