import * as MediaLibrary from "expo-media-library";
import { nativeMediaService } from "./native-media.service";
import { SyncLibraryUseCase } from "@/application/use-cases/sync-library.use-case";
import { SqliteTrackRepository } from "../repositories/sqlite-track.repository";
import { SQLiteDatabase } from "expo-sqlite";
import { createTables } from "@persistence/sqlite/migrations";

export const appInitializerService = {
  async init(db: SQLiteDatabase) {
    try {
      console.log(
        "[Init] Limpiando tablas existentes para una instalación fresca...",
      );
      await db.execAsync(`DROP TABLE IF EXISTS tracks;`);
      await createTables(db);
      console.log("[Init] Tablas verificadas/creadas con el nuevo esquema");
      const { status } = await MediaLibrary.getPermissionsAsync();

      if (status === "granted") {
        console.log(
          "[Init] Permisos detectados. Lanzando sincronización silenciosa...",
        );

        const repository = new SqliteTrackRepository(db);
        const syncUseCase = new SyncLibraryUseCase(repository);
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
