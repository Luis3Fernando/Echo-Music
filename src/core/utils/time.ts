export const TimeUtils = {
  formatTrackTime(ms: number): string {
    if (!ms || ms < 0) return "0:00";

    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const secondsStr = seconds < 10 ? `0${seconds}` : `${seconds}`;

    if (hours > 0) {
      const minutesStr = minutes < 10 ? `0${minutes}` : `${minutes}`;
      return `${hours}:${minutesStr}:${secondsStr}`;
    }

    return `${minutes}:${secondsStr}`;
  },

  formatPlaylistDuration(ms: number): string {
    if (!ms || ms < 0) return "0m";

    const totalMinutes = Math.floor(ms / (1000 * 60));
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }

    return `${minutes}m`;
  }
};

export const formatTrackTime = TimeUtils.formatTrackTime;
export const formatPlaylistDuration = TimeUtils.formatPlaylistDuration;