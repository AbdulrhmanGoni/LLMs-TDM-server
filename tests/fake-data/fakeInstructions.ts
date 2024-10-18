import { Types } from "mongoose";

const fakeInstructions = [
  {
    _id: new Types.ObjectId(),
    systemMessage: "Test system message 5",
    question: "Test question? 5",
    answer: "Test answer 5",
    createdAt: "2024-08-18T10:18:47.969Z",
    updatedAt: "2024-08-18T10:18:47.969Z",
  },
  {
    _id: new Types.ObjectId(),
    systemMessage: "Test system message 4",
    question: "Test question? 4",
    answer: "Test answer 4",
    createdAt: "2024-08-19T14:04:57.759Z",
    updatedAt: "2024-08-19T14:04:57.759Z",
  },
  {
    _id: new Types.ObjectId(),
    systemMessage: "Test system message 3",
    question: "Test question? 3",
    answer: "Test answer 3",
    createdAt: "2024-08-19T14:05:46.968Z",
    updatedAt: "2024-08-19T14:05:46.968Z",
  },
  {
    _id: new Types.ObjectId(),
    systemMessage: "Test system message 2",
    question: "Test question? 2",
    answer: "Test answer 2",
    createdAt: "2024-08-19T14:05:58.364Z",
    updatedAt: "2024-08-19T14:05:58.364Z",
  },
  {
    _id: new Types.ObjectId(),
    systemMessage: "Test system message 1",
    question: "Test question? 1",
    answer: "Test answer 1",
    createdAt: "2024-08-19T14:07:31.861Z",
    updatedAt: "2024-08-19T14:07:31.861Z",
  },
  {
    _id: new Types.ObjectId(),
    systemMessage: "Test system message",
    question: "Test question?",
    answer: "Test answer",
    createdAt: "2024-08-19T20:09:57.796Z",
    updatedAt: "2024-08-19T20:09:57.796Z",
  },
];

export const getRandomFakeInstruction = (datasetId: Types.ObjectId) => {
  const fakeInstruction =
    fakeInstructions[Math.floor(fakeInstructions.length * Math.random())];
  return {
    ...fakeInstruction,
    datasetId,
  };
};

export const getFakeInstructions = (datasetId: Types.ObjectId) => {
  return fakeInstructions.map((instruction) => ({
    ...instruction,
    datasetId,
  }));
};
