export function googleImageSearchUrl(label: string): string {
  const primaryLabel = label.split("＋", 1)[0].trim();
  const query = `${primaryLabel} イタリア料理`;
  return `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(query)}`;
}
