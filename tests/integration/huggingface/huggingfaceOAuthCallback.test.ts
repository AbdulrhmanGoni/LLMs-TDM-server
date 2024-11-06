import { expect, describe, it, afterAll, mock, beforeAll } from "bun:test";
import DatasetsModel from "../../../src/models/DatasetsModel";
import huggingfaceService from "../../../src/services/huggingface";
import databaseConnection from "../../../src/configurations/databaseConnection";
import operationsResultsMessages from "../../../src/constants/operationsResultsMessages";

const originalFetch = global.fetch;
const whoAmIMock = mock(async () => ({
  name: "username",
  emailVerified: true
}))

mock.module("@huggingface/hub", () => {
  return {
    whoAmI: whoAmIMock,
  };
});

beforeAll(async () => {
  await databaseConnection()
  await DatasetsModel.create({
    _id: process.env.TESTING_USER_ID,
    datasets: []
  })
})

describe(`Test "huggingfaceOAuthCallback" service method`, () => {
  const fakeHFTokenResponse = {
    expires_in: 85842,
    refresh_token: "gfjmd578s@$b7(Y^6",
    access_token: "N0976554#@jbwr_+aih!~"
  }

  it("Should complete huggingface OAuth callback process successfully", async () => {
    global.fetch = mock(async () => {
      return new Response(JSON.stringify(fakeHFTokenResponse), { status: 200 })
    });

    const { isSuccess, result } = await huggingfaceService.huggingfaceOAuthCallback(
      process.env.TESTING_USER_ID,
      "Wjj68!G#@$)(fykf6fdADS"
    )

    expect(isSuccess).toBeTrue()
    expect(whoAmIMock).toHaveBeenCalledWith({
      accessToken: fakeHFTokenResponse.access_token,
    })
    expect(result).toBe(operationsResultsMessages.successfulHuggingfaceAccountCreation)
  });

  it("Should handle an exeption during huggingface OAuth callback process", async () => {
    mock.module("@huggingface/hub", () => {
      return {
        whoAmI: async () => {
          throw new Error("Unexpected error");
        },
      };
    });

    const { isSuccess, message } = await huggingfaceService.huggingfaceOAuthCallback(
      process.env.TESTING_USER_ID,
      "Wjj68!G#@$)(fykf6fdADS"
    )

    expect(isSuccess).toBeFalse()
    expect(message).toBe(operationsResultsMessages.failedHuggingfaceOAuthProcess)
  });

  it("Should fail to complete huggingface OAuth callback process due to HF API request error", async () => {
    const fakeHFTokenRequestError = {
      error: "anyerror",
      error_description: "error description"
    }

    global.fetch = mock(async () => {
      return new Response(JSON.stringify(fakeHFTokenRequestError), { status: 400 })
    });

    const { isSuccess, message } = await huggingfaceService.huggingfaceOAuthCallback(
      process.env.TESTING_USER_ID,
      "Wjj68!G#@$)(fykf6fdADS"
    )

    expect(isSuccess).toBeFalse()
    expect(message).toMatch(fakeHFTokenRequestError.error)
    expect(message).toMatch(fakeHFTokenRequestError.error_description)
  });
});

afterAll(async () => {
  global.fetch = originalFetch;
  await DatasetsModel.deleteMany();
});
