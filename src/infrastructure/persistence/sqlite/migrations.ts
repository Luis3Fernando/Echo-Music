export const createTables = async (db: any) => {
  await db.execAsync(`
    PRAGMA journal_mode = WAL;
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
  `);
};
