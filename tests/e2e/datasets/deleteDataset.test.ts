import { afterAll, describe, expect, it, afterEach } from "bun:test";
import { request } from "../..";
import { getRandomFakeDataset } from "../../fake-data/fakeDatasets";
import DatasetsModel from "../../../src/models/DatasetsModel";
import RecentActivitiesModel from "../../../src/models/RecentActivitiesModel";
import operationsResultsMessages from "../../../src/constants/operationsResultsMessages";

const path = "datasets";

describe(`DELETE /${path}`, () => {
  it("Should response an error because the dataset is not existent", async () => {
    const fakeDataset = getRandomFakeDataset();

    await DatasetsModel.create({
      datasets: [],
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

    await DatasetsModel.create({
      datasets: [fakeDataset],
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
  await DatasetsModel.deleteMany();
});

afterAll(async () => {
  await RecentActivitiesModel.deleteMany();
});
