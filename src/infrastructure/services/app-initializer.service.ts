import * as MediaLibrary from "expo-media-library";
import { SyncLibraryUseCase } from "@/application/use-cases/sync-library.use-case";
import { SQLiteDatabase } from "expo-sqlite";
import { createTables } from "@persistence/sqlite/migrations";

import { SqliteTrackRepository } from "../repositories/sqlite-track.repository";
import { SqliteArtistRepository } from "../repositories/sqlite-artist.repository";
import { SQLiteAlbumRepository } from "../repositories/sqlite-album.repository";

export const appInitializerService = {
  async init(db: SQLiteDatabase) {
    try {
      console.log("[Init] Limpiando tablas para instalación fresca...");
      
      await db.execAsync(`
        DROP TABLE IF EXISTS playlist_tracks;
        DROP TABLE IF EXISTS playlists;
        DROP TABLE IF EXISTS tracks;
        DROP TABLE IF EXISTS albums;
        DROP TABLE IF EXISTS artists;
        DROP TABLE IF EXISTS playback_queue;
      `);

      await createTables(db);
      console.log("[Init] Tablas verificadas/creadas con el nuevo esquema");
      
      const { status } = await MediaLibrary.getPermissionsAsync();

      if (status === "granted") {
        console.log("[Init] Permisos detectados. Lanzando sincronización...");

        const trackRepo = new SqliteTrackRepository(db);
        const artistRepo = new SqliteArtistRepository(db);
        const albumRepo = new SQLiteAlbumRepository(db);
        const syncUseCase = new SyncLibraryUseCase(
          trackRepo, 
          artistRepo, 
          albumRepo
        );

        syncUseCase
          .execute(() => {})
          .then(() =>
            console.log("[Init] Escaneo silencioso completado con éxito"),
          )
          .catch((err) =>
            console.error("[Init] Error en escaneo silencioso:", err),
          );
      } else {
        console.log("[Init] Sin permisos aún. Se esperará al Onboarding.");
      }

      console.log("[Init] Sistema listo");
      return true;
    } catch (error) {
      console.error("[Init] Error crítico en la inicialización:", error);
      return false;
    }
  },
};