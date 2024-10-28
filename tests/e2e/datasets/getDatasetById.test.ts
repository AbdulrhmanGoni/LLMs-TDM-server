import { describe, expect, it, afterAll } from "bun:test";
import { request } from "../..";
import operationsResultsMessages from "../../../src/constants/operationsResultsMessages";
import DatasetsModel from "../../../src/models/DatasetsModel";
import { fakeDatasets } from "../../fake-data/fakeDatasets";
import RecentActivitiesModel from "../../../src/models/RecentActivitiesModel";
import { Types } from "mongoose";

const path = "datasets/:datasetId";

describe(`GET /${path}`, () => {
  it("Should return an error because the dataset is not existent", async () => {
    const randomDatasetId = new Types.ObjectId();
    const { resBody, status } = await request.GET(
      path.replace(":datasetId", randomDatasetId.toHexString())
    );

    expect(status).toBe(400);
    expect(resBody.message).toBe(
      operationsResultsMessages.noDataset(randomDatasetId.toHexString())
    );
  });

  it("Should return the targeted dataset by its id", async () => {
    const targetedDataset = fakeDatasets[0];
    const targetedDatasetId = targetedDataset._id.toHexString();
    await DatasetsModel.create({
      _id: process.env.TESTING_USER_ID,
      datasets: [targetedDataset],
    });

    const { resBody, status } = await request.GET(
      path.replace(":datasetId", targetedDatasetId)
    );

    expect(status).toBe(200);
    expect(resBody.data._id).toBe(targetedDatasetId);
    expect(resBody.data).toMatchObject({
      _id: targetedDatasetId,
      name: targetedDataset.name,
      description: targetedDataset.description,
      instructionsCount: 0,
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });
  });
});

afterAll(async () => {
  await DatasetsModel.deleteMany();
  await RecentActivitiesModel.deleteMany();
});
