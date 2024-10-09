import type { LogDetails } from "../../types/logging";
import logger_service from "./logger_service";

type shortedLogDetails = Omit<LogDetails, "level" | "message">;

class LoggerService {
  constructor() {}

  private logger = logger_service;

  error(message: string, details: shortedLogDetails) {
    this.logger({
      message,
      level: "error",
      ...details,
    });
  }

  info(message: string, details: shortedLogDetails) {
    this.logger({
      message,
      level: "info",
      ...details,
    });
  }

  warning(message: string, details: shortedLogDetails) {
    this.logger({
      message,
      level: "warning",
      ...details,
    });
  }
}

const loggerService = new LoggerService();

export default loggerService;
