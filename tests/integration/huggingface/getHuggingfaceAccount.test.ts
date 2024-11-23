import { describe, expect, it, afterAll, beforeAll } from "bun:test";
import operationsResultsMessages from "../../../src/constants/operationsResultsMessages";
import UserModel from "../../../src/models/UserModel";
import databaseConnection from "../../../src/configurations/databaseConnection";
import huggingfaceService from "../../../src/services/huggingface";
import { fakeUserHuggingfaceAccount } from "../../fake-data/fakeUserHuggingfaceAccount";

beforeAll(async () => {
  await databaseConnection();
});

describe("Test `getHuggingfaceAccount` service method", () => {
  it("Should not return user's huggingface account because it is not existant", async () => {
    const result = await huggingfaceService.getHuggingfaceAccount(
      process.env.TESTING_USER_ID
    );

    expect(result.isSuccess).toBeTrue();
    expect(result.message).toBe(operationsResultsMessages.noHuggingfaceAccount);
  });

  it("Should return user's huggingface account successfully", async () => {
    await UserModel.create({
      _id: process.env.TESTING_USER_ID,
      huggingfaceAccount: fakeUserHuggingfaceAccount
    })

    const result = await huggingfaceService.getHuggingfaceAccount(
      process.env.TESTING_USER_ID
    );

    expect(result.isSuccess).toBeTrue();
    expect(result.result).toMatchObject({
      accessToken: fakeUserHuggingfaceAccount.accessToken,
      accessTokenExpiresIn: expect.any(Date),
      refreshToken: fakeUserHuggingfaceAccount.refreshToken,
      username: fakeUserHuggingfaceAccount.username,
      emailVerified: fakeUserHuggingfaceAccount.emailVerified,
    });
  });
});

afterAll(async () => {
  await UserModel.deleteMany();
});
