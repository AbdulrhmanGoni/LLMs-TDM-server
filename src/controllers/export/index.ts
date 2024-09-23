import export_controller from "./exportDataset_controller";

class ExportDatasetController {
  constructor() {}

  exportDataset = export_controller;
}

const exportDatasetController = new ExportDatasetController();

export default exportDatasetController;
