export enum RepeatMode {
  NONE = 'none',
  ALL = 'all',
  ONE = 'one',
}

export const getNextRepeatMode = (current: RepeatMode): RepeatMode => {
  switch (current) {
    case RepeatMode.NONE: return RepeatMode.ALL;
    case RepeatMode.ALL: return RepeatMode.ONE;
    case RepeatMode.ONE: return RepeatMode.NONE;
    default: return RepeatMode.NONE;
  }
};