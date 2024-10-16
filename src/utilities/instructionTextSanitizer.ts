export default function instructionTextSanitizer(text?: string | null) {
  return text?.replaceAll(/("|\n)/g, (s) =>
    s === '"' ? "'" : s === "\n" ? " " : s
  );
}
