import { Track } from '@entities/track.entity';

export const MOCK_TRACK: Track = {
  id: 'martin-garrix-001',
  title: 'Drop That Low',
  artistName: 'Tujamo',
  albumName: 'Drop - Single',
  artworkUri: 'https://cdn-images.dzcdn.net/images/cover/3d1b2422e1f22dceda9fb63b97cc72ec/0x1900-000000-80-0-0.jpg',
  duration: 230,
  isProcessed: true,
  url: '',
  format: 'mp3',
  size: 122,
  dateAdded: Date.now()
};