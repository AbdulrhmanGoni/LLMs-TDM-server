import { afterAll, describe, expect, it, afterEach } from "bun:test";
import { request } from "../..";
import { getRandomFakeDataset } from "../../fake-data/fakeDatasets";
import UserModel from "../../../src/models/UserModel";
import operationsResultsMessages from "../../../src/constants/operationsResultsMessages";

const path = "datasets";

describe(`DELETE /${path}`, () => {
  it("Should response an error because the dataset is not existent", async () => {
    const fakeDataset = getRandomFakeDataset();

    await UserModel.create({
      datasets: [],
      datasetsActivities: [],
      instructionsActivities: [],
      _id: process.env.TESTING_USER_ID,
    });

    const { resBody, status } = await request.DELETE(
      `${path}/${fakeDataset._id.toHexString()}`
    );

    expect(status).toBe(400);
    expect(resBody.message).toBe(
      operationsResultsMessages.noDataset(fakeDataset._id.toHexString())
    );
  });

  it("Should delete the dataset successflly", async () => {
    const fakeDataset = getRandomFakeDataset();

    await UserModel.create({
      datasets: [fakeDataset],
      datasetsActivities: [],
      instructionsActivities: [],
      _id: process.env.TESTING_USER_ID,
    });

    const { resBody, status } = await request.DELETE(
      `${path}/${fakeDataset._id.toHexString()}`
    );

    expect(status).toBe(200);
    expect(resBody.message).toBe(
      operationsResultsMessages.successfulDatasetDeletion
    );
  });
});

afterEach(async () => {
  await UserModel.deleteMany();
});
