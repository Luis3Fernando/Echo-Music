import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('echo_music.db');

export const initDatabase = async () => {
  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS track (
      id TEXT PRIMARY KEY NOT NULL,
      file_uri TEXT UNIQUE NOT NULL,
      title TEXT,
      artist TEXT,
      album TEXT,
      genre TEXT,
      year INTEGER,
      duration INTEGER,
      file_name TEXT,             
      file_size INTEGER,         
      format TEXT,
      bitrate INTEGER,
      artwork_uri TEXT,       
      date_added INTEGER,    
      is_processed INTEGER DEFAULT 0
    );
  `);
};

export default db;