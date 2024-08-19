export default function extractResourceName(path: string) {
  let basePath = "";

  for (let i = 1; i < path.length; i++) {
    const letter = path[i];
    if (letter !== "/") {
      basePath += letter;
    } else break;
  }

  return basePath;
}
