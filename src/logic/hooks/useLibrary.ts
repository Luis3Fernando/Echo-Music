import { MOCK_TRACKS } from '@mocks/trackMocks';

export const useLibrary = () => {
  const songs = MOCK_TRACKS;

  return {
    songs,
  };
};