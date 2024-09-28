import exportDataset_service from "./exportDataset_service";
import exportDatasetWS_service from "./exportDatasetWS_service";

class ExportDatasetService {
  constructor() {}

  exportDataset = exportDataset_service;
  exportDatasetWS = exportDatasetWS_service;
}

const exportDatasetService = new ExportDatasetService();

export default exportDatasetService;
