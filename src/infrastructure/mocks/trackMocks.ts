import { RawTrack } from "@models/Track";

export const MOCK_TRACKS: RawTrack[] = [
  {
      id: "1",
      url: "path/to/song1.mp3",
      title: "Like a Stone",
      artist: "Audioslave",
      album: "Audioslave",
      duration: 294000,
      fileName: "like_a_stone.mp3",
      fileSize: 5000000,
      format: "mp3",
      dateAdded: Date.now(),
      genre: null,
      year: null,
      bitrate: null,
      artworkUri: null
  },
  {
      id: "2",
      url: "path/to/song2.mp3",
      title: "Comfortably Numb",
      artist: "Pink Floyd",
      album: "The Wall",
      duration: 382000,
      fileName: "numb.mp3",
      fileSize: 8000000,
      format: "mp3",
      dateAdded: Date.now(),
      genre: null,
      year: null,
      bitrate: null,
      artworkUri: null
  },
];
