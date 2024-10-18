import { getRandomFakeDataset } from "./fakeDatasets";
import type {
  DatasetActivity,
  InstructionActivity,
} from "../../src/types/activities";
import { getRandomFakeInstruction } from "./fakeInstructions";

export const fakeRecentDatasetActivities: DatasetActivity[] = [
  {
    activity: "Deletion",
    dataset: getRandomFakeDataset(),
    activityDate: new Date(),
  },
  {
    activity: "Modification",
    dataset: getRandomFakeDataset(),
    activityDate: new Date(),
  },
  {
    activity: "New Resource",
    dataset: getRandomFakeDataset(),
    activityDate: new Date(),
  },
];

export const fakeRecentInstructionActivities: InstructionActivity[] = [
  (function () {
    const dataset = getRandomFakeDataset();
    const instruction = getRandomFakeInstruction(dataset._id);
    return {
      activity: "Deletion",
      dataset,
      instruction,
      activityDate: new Date(),
    };
  })(),
  (function () {
    const dataset = getRandomFakeDataset();
    const instruction = getRandomFakeInstruction(dataset._id);
    return {
      activity: "Modification",
      dataset,
      instruction,
      activityDate: new Date(),
    };
  })(),
  (function () {
    const dataset = getRandomFakeDataset();
    const instruction = getRandomFakeInstruction(dataset._id);
    return {
      activity: "New Resource",
      dataset,
      instruction,
      activityDate: new Date(),
    };
  })(),
];
