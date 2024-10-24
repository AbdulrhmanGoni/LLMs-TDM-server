import { listDatasets } from "@huggingface/hub";
import ServiceOperationResult from "../../utilities/ServiceOperationResult";
import huggingfaceService from ".";

export default async function getDatasetsRepositories_service(userId: string) {
  const {
    isSuccess,
    result: huggingfaceAccount,
    message,
  } = await huggingfaceService.getHuggingfaceAccount(userId);

  if (isSuccess && huggingfaceAccount) {
    const reposReadableStream = listDatasets({
      accessToken: huggingfaceAccount.accessToken,
      search: { owner: huggingfaceAccount.username },
    });

    const datasets = [];
    for await (const dataset of reposReadableStream) {
      datasets.push(dataset);
    }
    return ServiceOperationResult.success(datasets);
  } else {
    return ServiceOperationResult.failure(message);
  }
}
