import { describe, expect, it, afterAll, beforeAll } from "bun:test";
import activitiesService from "../../../src/services/activities";
import { fakeDatasets } from "../../fake-data/fakeDatasets";
import RecentActivitiesModel from "../../../src/models/RecentActivitiesModel";
import { getFakeInstructions } from "../../fake-data/fakeInstructions";
import DatasetsModel from "../../../src/models/DatasetsModel";
import databaseConnection from "../../../src/configurations/databaseConnection";

beforeAll(async () => {
  await databaseConnection();
});

describe("ActivitiesService class's methods", () => {
  it("Should register a new dataset activity", async () => {
    const userId = process.env.TESTING_USER_ID;
    const fakeDataset = fakeDatasets[0];

    await activitiesService.registerDatasetActivity(
      userId,
      fakeDataset,
      new Date(),
      "New Resource"
    );

    const activitiesData = await RecentActivitiesModel.findOne({ _id: userId });

    expect(activitiesData).toBeDefined();
    expect(activitiesData?._id).toBe(userId);
    expect(activitiesData?.datasetsActivities).toHaveLength(1);
    expect(activitiesData?.datasetsActivities[0]).toMatchObject({
      dataset: fakeDataset,
      activity: "New Resource",
    });
  });

  it("Should register a new instruction activity", async () => {
    const userId = process.env.TESTING_USER_ID;
    const fakeDataset = fakeDatasets[0];
    const fakeInstruction = getFakeInstructions(fakeDataset._id)[0];

    await DatasetsModel.create({
      datasets: [fakeDataset],
      _id: userId,
    });

    await activitiesService.registerInstructionActivity(
      userId,
      fakeDataset._id.toString(),
      {
        _id: fakeInstruction._id,
        systemMessage: fakeInstruction.systemMessage,
        question: fakeInstruction.question,
        answer: fakeInstruction.answer,
      },
      new Date(),
      "Modification"
    );

    const activitiesData = await RecentActivitiesModel.findOne({ _id: userId });

    expect(activitiesData).toBeDefined();
    expect(activitiesData?._id).toBe(userId);
    expect(activitiesData?.instructionsActivities).toHaveLength(1);
    expect(activitiesData?.instructionsActivities[0].instruction).toMatchObject(
      {
        _id: fakeInstruction._id,
        systemMessage: fakeInstruction.systemMessage,
        question: fakeInstruction.question,
        answer: fakeInstruction.answer,
      }
    );
  });
});

afterAll(async () => {
  await DatasetsModel.deleteMany();
  await RecentActivitiesModel.deleteMany();
});
