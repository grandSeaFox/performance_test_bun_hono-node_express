const stopWords = new Set(["and", "or", "but", "not", "on", "the", "a"]);

export function preprocessQuery(input: string) {
  const stopWords = new Set(["the", "is", "at", "which", "on"]);
  return input
    .split(/\s+/)
    .filter((word) => !stopWords.has(word))
    .join(" & ");
}

export function sanitizeInput(input: string) {
  return input.replace(/[^a-zA-Z0-9 \-+]/g, "");
}

export function preprocessAndValidateQuery(input: string) {
  const words = input.toLowerCase().split(/\s+/);
  const validWords = words.filter((word) => !stopWords.has(word));

  if (validWords.length === 0) {
    return null;
  }

  return validWords.join(" & ");
}
