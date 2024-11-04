import { describe, expect, it, afterAll, beforeAll, mock } from "bun:test";
import operationsResultsMessages from "../../../src/constants/operationsResultsMessages";
import DatasetsModel from "../../../src/models/DatasetsModel";
import databaseConnection from "../../../src/configurations/databaseConnection";
import huggingfaceService from "../../../src/services/huggingface";

mock.module("@huggingface/hub", () => {
  return {
    whoAmI: async () => ({
      name: "username",
      emailVerified: true
    }),
  };
});

beforeAll(async () => {
  await databaseConnection();
});

describe("Test `createHuggingfaceAccount` service method", () => {

  const userHuggingfaceAccountCredentials = {
    accessTokenExpiresIn: 57478, // in seconds
    hfAccessToken: "n@!*&edVryme573@55n",
    hfRefreshToken: "kjbgv&B^#65jbN(*Y#@1hj"
  }

  it("Should fail to create the huggingface account for the user because the user is not existant", async () => {
    const result = await huggingfaceService.createHuggingfaceAccount(
      process.env.TESTING_USER_ID,
      userHuggingfaceAccountCredentials
    );

    expect(result.isSuccess).toBeFalse();
    expect(result.message).toBe(operationsResultsMessages.failedHuggingfaceAccountCreation);
  });

  it("Should create the huggingface account for the user", async () => {
    await DatasetsModel.create({ _id: process.env.TESTING_USER_ID })

    const result = await huggingfaceService.createHuggingfaceAccount(
      process.env.TESTING_USER_ID,
      userHuggingfaceAccountCredentials
    );

    expect(result.isSuccess).toBeTrue();
    expect(result.result).toBe(operationsResultsMessages.successfulHuggingfaceAccountCreation);
  });
});

afterAll(async () => {
  mock.restore()
  await DatasetsModel.deleteMany();
});
