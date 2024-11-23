import { describe, expect, it, afterAll, beforeAll, mock } from "bun:test";
import databaseConnection from "../../../src/configurations/databaseConnection";
import huggingfaceService from "../../../src/services/huggingface";
import UserModel from "../../../src/models/UserModel";
import operationsResultsMessages from "../../../src/constants/operationsResultsMessages";
import { fakeUserHuggingfaceAccount } from "../../fake-data/fakeUserHuggingfaceAccount";

beforeAll(async () => {
  await databaseConnection();
});

const originalFetch = global.fetch

describe("Test `refreshHuggingfaceAccessToken` service method", () => {
  it('Should complete refreshing access token process successfully', async () => {
    const mockFetch = mock(async () => {
      const payload = {
        access_token: "-p0__8dso$@pyv94wmm6@#7",
        refresh_token: "gj%*dqvp082_+9-ym8nmhj",
        expires_in: 46346
      }
      return new Response(JSON.stringify(payload), { status: 200 })
    })

    global.fetch = mockFetch

    await UserModel.create({
      _id: process.env.TESTING_USER_ID,
      huggingfaceAccount: fakeUserHuggingfaceAccount
    })

    const result = await huggingfaceService.refreshHuggingfaceAccessToken(
      process.env.TESTING_USER_ID,
      "f5@*)d#@dSjykgyk*&t84gCk"
    );

    expect(mockFetch).toHaveBeenCalled()
    expect(result.isSuccess).toBeTrue();
    expect(result.result).toMatchObject({
      accessToken: expect.any(String),
      accessTokenExpiresIn: expect.any(Date),
      refreshToken: expect.any(String),
      username: "anyname",
      emailVerified: true,
    });
  });

  it('Should catch and return an error because of failed external API request', async () => {
    const mockFetch = mock(async () => {
      return new Response("{}", { status: 400 })
    })

    global.fetch = mockFetch

    const result = await huggingfaceService.refreshHuggingfaceAccessToken(
      process.env.TESTING_USER_ID,
      "f5@*)d#@dSjykgyk*&t84gCk"
    );

    expect(mockFetch).toHaveBeenCalled()
    expect(result.isSuccess).toBeFalse();
    expect(result.message).toBe(operationsResultsMessages.failedAccessTokenRefreshing);
  });
});

afterAll(async () => {
  global.fetch = originalFetch
  await UserModel.deleteMany();
});
