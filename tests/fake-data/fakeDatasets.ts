import { Types } from "mongoose";

export const fakeDatasets = [
  {
    _id: new Types.ObjectId(),
    name: "Testing dataset 1",
    description: "This is a fake testing dataset 1",
  },
  {
    _id: new Types.ObjectId(),
    name: "Testing dataset 2",
    description: "This is a fake testing dataset 2",
  },
  {
    _id: new Types.ObjectId(),
    name: "Testing dataset 3",
    description: "This is a fake testing dataset 3",
  },
];

export const getRandomFakeDataset = () => {
  return fakeDatasets[Math.floor(fakeDatasets.length * Math.random())];
};
