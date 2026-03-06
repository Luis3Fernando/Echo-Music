export const createTables = async (db: any) => {
  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    PRAGMA foreign_keys = ON;

    CREATE TABLE IF NOT EXISTS artists (
      id TEXT PRIMARY KEY NOT NULL,
      name TEXT NOT NULL,
      pictureUrl TEXT,
      description TEXT,
      socialLinks TEXT,
      reels TEXT,  
      isProcessed INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS tracks (
      id TEXT PRIMARY KEY NOT NULL,
      url TEXT NOT NULL,
      title TEXT NOT NULL,
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
      isProcessed INTEGER DEFAULT 0,
      dateAdded INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS track_artists (
      trackId TEXT NOT NULL,
      artistId TEXT NOT NULL,
      PRIMARY KEY (trackId, artistId),
      FOREIGN KEY (trackId) REFERENCES tracks (id) ON DELETE CASCADE,
      FOREIGN KEY (artistId) REFERENCES artists (id) ON DELETE CASCADE
    );
  `);
};
