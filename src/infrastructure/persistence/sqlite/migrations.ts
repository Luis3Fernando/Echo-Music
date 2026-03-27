export const createTables = async (db: any) => {
  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    PRAGMA foreign_keys = ON;

    CREATE TABLE IF NOT EXISTS artists (
      id TEXT PRIMARY KEY NOT NULL,
      name TEXT NOT NULL,
      pictureUrl TEXT NOT NULL,
      description TEXT,
      socialLinks TEXT,
      reels TEXT,
      isProcessed INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS albums (
      id TEXT PRIMARY KEY NOT NULL,
      title TEXT NOT NULL,
      artistId TEXT NOT NULL,
      artistName TEXT NOT NULL,
      artworkUri TEXT,
      year INTEGER,
      trackCount INTEGER DEFAULT 0,
      playCount INTEGER DEFAULT 0,
      FOREIGN KEY (artistId) REFERENCES artists (id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS tracks (
      id TEXT PRIMARY KEY NOT NULL,
      url TEXT NOT NULL,
      title TEXT NOT NULL,
      artistId TEXT NOT NULL,
      albumId TEXT,
      artistName TEXT NOT NULL,
      albumName TEXT NOT NULL,
      duration INTEGER NOT NULL,
      format TEXT NOT NULL,
      bitrate INTEGER,
      size INTEGER NOT NULL,
      genre TEXT,
      year INTEGER,
      trackNumber INTEGER,
      diskNumber INTEGER,
      artworkUri TEXT,
      lyricsContent TEXT,
      lyricsType TEXT,
      lyricsSource TEXT,
      isFavorite INTEGER DEFAULT 0,
      isProcessed INTEGER DEFAULT 0,
      dateAdded INTEGER NOT NULL,
      playCount INTEGER DEFAULT 0,
      FOREIGN KEY (artistId) REFERENCES artists (id) ON DELETE CASCADE,
      FOREIGN KEY (albumId) REFERENCES albums (id) ON DELETE SET NULL
    );

    CREATE TABLE IF NOT EXISTS playlists (
      id TEXT PRIMARY KEY NOT NULL,
      name TEXT NOT NULL,
      artworkUri TEXT,
      isUserCreated INTEGER DEFAULT 1,
      trackCount INTEGER DEFAULT 0,
      createdAt INTEGER NOT NULL,
      updatedAt INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS playlist_tracks (
      playlistId TEXT NOT NULL,
      trackId TEXT NOT NULL,
      orderIndex INTEGER NOT NULL,
      PRIMARY KEY (playlistId, trackId),
      FOREIGN KEY (playlistId) REFERENCES playlists (id) ON DELETE CASCADE,
      FOREIGN KEY (trackId) REFERENCES tracks (id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS playback_queue (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      currentTrackId TEXT,
      tracks TEXT,
      shuffledTracks TEXT,
      isShuffle INTEGER DEFAULT 0,
      repeatMode TEXT DEFAULT 'none',
      currentIndex INTEGER DEFAULT 0,
      FOREIGN KEY (currentTrackId) REFERENCES tracks (id) ON DELETE SET NULL
    );

    CREATE TABLE IF NOT EXISTS track_artists (
      trackId TEXT NOT NULL,
      artistId TEXT NOT NULL,
      PRIMARY KEY (trackId, artistId),
      FOREIGN KEY (trackId) REFERENCES tracks (id) ON DELETE CASCADE,
      FOREIGN KEY (artistId) REFERENCES artists (id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS album_artists (
      albumId TEXT NOT NULL,
      artistId TEXT NOT NULL,
      PRIMARY KEY (albumId, artistId),
      FOREIGN KEY (albumId) REFERENCES albums (id) ON DELETE CASCADE,
      FOREIGN KEY (artistId) REFERENCES artists (id) ON DELETE CASCADE
    );
  `);
};