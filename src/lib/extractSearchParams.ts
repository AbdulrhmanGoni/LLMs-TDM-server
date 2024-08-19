import type { SearchParams } from "../types/request";

export default function extractSearchParams(url: URL): SearchParams {
  const searchParams: SearchParams = {};
  url.searchParams.forEach((value, key) => {
    if (value) {
      searchParams[key] = value;
    }
  });
  return searchParams;
}
