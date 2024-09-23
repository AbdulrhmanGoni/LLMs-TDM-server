import exportDataset_service from "./exportDataset_service";

class ExportDatasetService {
  constructor() {}

  exportDataset = exportDataset_service;
}

const exportDatasetService = new ExportDatasetService();

export default exportDatasetService;
