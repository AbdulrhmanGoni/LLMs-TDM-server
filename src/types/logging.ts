export type LogLevel = "error" | "warning" | "info";

export type LogDetails = {
  message: string;
  service?: string;
  operation?: string;
  level: LogLevel;
  userId?: string;
  datasetId?: string;
  instructionId?: string;
};
