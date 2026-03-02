import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabaseSync('echo_music_v2.db');

export const initDatabase = async () => {
  try {
    await db.execAsync(`
      PRAGMA journal_mode = WAL;
      CREATE TABLE IF NOT EXISTS tracks (
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
    console.log("Tabla 'tracks' inicializada.");
  } catch (error) {
    console.error("Error al crear el esquema:", error);
    throw error;
  }
};

export default db;