export function preprocessQuery(input: string) {
  const stopWords = new Set(["the", "is", "at", "which", "on"]);
  return input
    .split(/\s+/)
    .filter((word) => !stopWords.has(word))
    .join(" & ");
}
