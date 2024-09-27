import type { DatasetsFormatsRegistry } from "../../types/datasets";
import JSONL_Format from "./JSONL_Format";
import CSV_Format from "./CSV_Format";

const formats: DatasetsFormatsRegistry = {
  JSONL: JSONL_Format,
  CSV: CSV_Format,
};

export const DatasetsFormats = Object.keys(formats);

export default formats;
