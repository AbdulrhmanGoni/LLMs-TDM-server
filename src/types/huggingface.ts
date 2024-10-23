import type { WhoAmIUser } from "@huggingface/hub";
import type { DatasetsFormatsTypes } from "./datasets";

export type UserHuggingfaceAccount = {
  username: WhoAmIUser["name"];
  emailVerified: WhoAmIUser["emailVerified"];
  accessToken: string;
  refreshToken: string;
};

export type DatasetRepositoryBase = {
  fileFormat: DatasetsFormatsTypes;
  filePath: string;
  name: string;
};

export type DatasetRepository = DatasetRepositoryBase & {
  syncedAt: Date;
  isUpToDate: boolean;
};

