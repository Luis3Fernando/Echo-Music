export const ArtistSplitter = {
  split(rawName: string | null | undefined): string[] {
    if (!rawName || typeof rawName !== 'string') {
      return ["Artista Desconocido"];
    }

    const cleaned = rawName
      .replace(/\s+(feat\.?|ft\.?|with|arr\.)\s+/gi, '|')
      .replace(/[;/]/g, '|')
      .replace(/,/g, '|');

    return cleaned
      .split('|')
      .map(name => name.trim())
      .filter(name => name.length > 0);
  }
};