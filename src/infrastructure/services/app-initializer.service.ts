import * as MediaLibrary from "expo-media-library";
import { SQLiteDatabase } from "expo-sqlite";
import { createTables } from "@persistence/sqlite/migrations";
import { SqliteTrackRepository } from "@repositories/sqlite-track.repository";
import { SqliteArtistRepository } from "@repositories/sqlite-artist.repository";
import { SQLiteAlbumRepository } from "@repositories/sqlite-album.repository";
import { SqlitePlaylistRepository } from "@repositories/sqlite-playlist.repository";
import { SyncLibraryUseCase } from "@use-cases/sync-library.use-case";
import { CreateInitialPlaylistsUseCase } from "@use-cases/init-app/create-initial-playlists.use-case";

export const appInitializerService = {
  async init(db: SQLiteDatabase) {
    try {
      console.log("[Init] Limpiando tablas para instalación fresca...");
  
      await db.execAsync(`
        PRAGMA foreign_keys = OFF;
        DROP TABLE IF EXISTS playlist_tracks;
        DROP TABLE IF EXISTS track_artists;
        DROP TABLE IF EXISTS album_artists;
        DROP TABLE IF EXISTS playlists;
        DROP TABLE IF EXISTS tracks;
        DROP TABLE IF EXISTS albums;
        DROP TABLE IF EXISTS artists;
        DROP TABLE IF EXISTS playback_queue;
        PRAGMA foreign_keys = ON;
      `);

      await createTables(db);
      console.log("[Init] Esquema de base de datos listo.");
      
      const { status } = await MediaLibrary.getPermissionsAsync();

      if (status === "granted") {
        console.log("[Init] Permisos OK. Iniciando sincronización de fondo...");

        const trackRepo = new SqliteTrackRepository(db);
        const artistRepo = new SqliteArtistRepository(db);
        const albumRepo = new SQLiteAlbumRepository(db);
        const playlistRepo = new SqlitePlaylistRepository(db);
        
        const syncUseCase = new SyncLibraryUseCase(
          trackRepo, 
          artistRepo, 
          albumRepo
        );

        const playlistUseCase = new CreateInitialPlaylistsUseCase(
          playlistRepo,
          trackRepo
        );

        syncUseCase
          .execute((percent) => {
             if (percent % 10 === 0) console.log(`[Sync] Progreso: ${percent}%`);
          })
          .then(async () => {
            console.log("[Init] ¡Biblioteca sincronizada! Generando playlists iniciales...");
            await playlistUseCase.execute();
            
            console.log("[Init] Playlists creadas y listas para usar.");
          })
          .catch((err) => console.error("[Init] Error en el proceso de fondo:", err));

      } else {
        console.log("[Init] Permisos pendientes. El escaneo se hará tras el Onboarding.");
      }

      return true;
    } catch (error) {
      console.error("[Init] Error crítico en inicialización:", error);
      return false;
    }
  },
};