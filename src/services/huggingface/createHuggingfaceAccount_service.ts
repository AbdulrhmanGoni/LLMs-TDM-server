import { whoAmI, type WhoAmIUser } from "@huggingface/hub";
import DatasetsModel from "../../models/DatasetsModel";
import ServiceOperationResult from "../../utilities/ServiceOperationResult";
import operationsResultsMessages from "../../constants/operationsResultsMessages";

export default async function createHuggingfaceAccount_service(
  userId: string,
  hfAccessToken: string,
  hfRefreshToken: string
) {
  const hfUser = (await whoAmI({ accessToken: hfAccessToken })) as WhoAmIUser;

  const { modifiedCount } = await DatasetsModel.updateOne(
    { _id: userId },
    {
      $set: {
        huggingfaceAccount: {
          accessToken: hfAccessToken,
          refreshToken: hfRefreshToken,
          username: hfUser.name,
          emailVerified: hfUser.emailVerified,
          repositories: [],
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
