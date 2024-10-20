import { describe, expect, it, afterAll, afterEach } from "bun:test";
import { request } from "../..";
import { getRandomFakeInstruction } from "../../fake-data/fakeInstructions";
import { getRandomFakeDataset } from "../../fake-data/fakeDatasets";
import DatasetsModel from "../../../src/models/DatasetsModel";
import InstructionModel from "../../../src/models/InstructionModel";
import RecentActivitiesModel from "../../../src/models/RecentActivitiesModel";
import operationsResultsMessages from "../../../src/constants/operationsResultsMessages";
import { Types } from "mongoose";

const path = "instructions";

describe(`POST /${path}`, () => {
  it("Should add the instruction to the dataset successfully", async () => {
    const fakeDataset = getRandomFakeDataset();

    await DatasetsModel.create({
      datasets: [fakeDataset],
      _id: process.env.TESTING_USER_ID,
    });

    const newInstruction = getRandomFakeInstruction(fakeDataset._id);
    const { resBody, status } = await request.POST(path, newInstruction);

    expect(status).toBe(200);
    expect(resBody.message).toBe(
      operationsResultsMessages.successfulInstructionAddition
    );
    expect(resBody.data).toMatchObject({
      systemMessage: newInstruction.systemMessage,
      question: newInstruction.question,
      answer: newInstruction.answer,
      datasetId: newInstruction.datasetId.toHexString(),
    });
  });

  it("Should response an error because the dataset is not exist", async () => {
    const randomDatasetId = new Types.ObjectId();
    const newInstruction = getRandomFakeInstruction(randomDatasetId);
    const { resBody, status } = await request.POST(path, newInstruction);

    expect(status).toBe(400);
    expect(resBody.message).toBe(
      operationsResultsMessages.failedInstructionAddition
    );
  });
});

afterEach(async () => {
  await DatasetsModel.deleteMany();
  await InstructionModel.deleteMany();
});

afterAll(async () => {
  await RecentActivitiesModel.deleteMany();
});
