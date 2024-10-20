import { describe, expect, it, afterAll } from "bun:test";
import { request } from "../..";
import { getFakeInstructions } from "../../fake-data/fakeInstructions";
import { getRandomFakeDataset } from "../../fake-data/fakeDatasets";
import type { Instruction } from "../../../src/types/instructions";
import DatasetsModel from "../../../src/models/DatasetsModel";
import InstructionModel from "../../../src/models/InstructionModel";
import operationsResultsMessages from "../../../src/constants/operationsResultsMessages";

const path = "instructions";

describe(`GET /${path}`, () => {
  it(`Should fail to get any instructions because the dataset is not exist`, async () => {
    const rendomDataset = "c6b62caab73100a4baf2ad69",
      page = "1",
      pageSize = "3";

    const searchParams = new URLSearchParams();
    searchParams.append("datasetId", rendomDataset);
    searchParams.append("page", page);
    searchParams.append("pageSize", pageSize);
    const url = `${path}?${searchParams.toString()}`;
    const { resBody } = await request.GET(url);
    expect(resBody.message).toBe(
      operationsResultsMessages.noInstructionsForDataset(rendomDataset)
    );
  });

  it("Should get the instructions of the datasets successfully", async () => {
    const page = "1",
      pageSize = "3";

    const fakeDataset = getRandomFakeDataset();

    await DatasetsModel.create({
      datasets: [fakeDataset],
      _id: process.env.TESTING_USER_ID,
    });

    await InstructionModel.insertMany(getFakeInstructions(fakeDataset._id));

    const searchParams = new URLSearchParams();
    searchParams.append("datasetId", fakeDataset._id.toHexString());
    searchParams.append("page", page);
    searchParams.append("pageSize", pageSize);
    const url = `${path}?${searchParams.toString()}`;
    const { resBody, status } = await request.GET(url);

    expect(status).toBe(200);
    expect(resBody.data.areThereMore).toBe(true);
    expect(resBody.data.instructions.length).toBe(+pageSize);
    resBody.data.instructions.forEach((instruction: Instruction) => {
      expect(instruction).toMatchObject({
        _id: expect.toBeObjectId(),
        systemMessage: expect.any(String),
        question: expect.any(String),
        answer: expect.any(String),
        datasetId: expect.toBeObjectId(),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      });
    });
  });
});

afterAll(async () => {
  await DatasetsModel.deleteMany();
  await InstructionModel.deleteMany();
});
