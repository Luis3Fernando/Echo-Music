export interface SyncedLyricLine {
  time: number;
  text: string;
}

export const parseLRC = (lrcContent: string): SyncedLyricLine[] => {
  const lines = lrcContent.split('\n');
  const result: SyncedLyricLine[] = [];
  const timeExp = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/g;

  lines.forEach(line => {
    const text = line.replace(timeExp, '').trim();
    if (!text) return;

    let match;
    timeExp.lastIndex = 0;
    while ((match = timeExp.exec(line)) !== null) {
      const minutes = parseInt(match[1]);
      const seconds = parseInt(match[2]);
      const milliseconds = parseInt(match[3]);
      const time = minutes * 60 + seconds + milliseconds / (match[3].length === 3 ? 1000 : 100);
      result.push({ time, text });
    }
  });

  return result.sort((a, b) => a.time - b.time);
};