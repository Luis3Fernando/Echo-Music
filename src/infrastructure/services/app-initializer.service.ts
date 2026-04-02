import * as MediaLibrary from "expo-media-library";
import { SQLiteDatabase } from "expo-sqlite";
import { createTables } from "@persistence/sqlite/migrations";
import { SqliteTrackRepository } from "@repositories/sqlite-track.repository";
import { SqliteArtistRepository } from "@repositories/sqlite-artist.repository";
import { SQLiteAlbumRepository } from "@repositories/sqlite-album.repository";
import { SqlitePlaylistRepository } from "@repositories/sqlite-playlist.repository";
import { SqliteAppSettingsRepository } from "@repositories/sqlite-app-settings.repository";
import { SqlitePlaybackQueueRepository } from "@repositories/sqlite-playback-queue.repository";
import { SyncLibraryUseCase } from "@/application/use-cases/init-app/sync-library.use-case";
import { CreateInitialPlaylistsUseCase } from "@use-cases/init-app/create-initial-playlists.use-case";
import { InitializeAppSettingsUseCase } from "@use-cases/settings/initialize-app-settings.use-case";
import { InitializeQueueUseCase } from "@use-cases/player/initialize-queue.use-case";

export const appInitializerService = {
  async init(db: SQLiteDatabase) {
    try {
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
        DROP TABLE IF EXISTS app_settings;
        PRAGMA foreign_keys = ON;
      `);

      await createTables(db);

      const settingsRepo = new SqliteAppSettingsRepository(db);
      const initSettingsUseCase = new InitializeAppSettingsUseCase(settingsRepo);
      await initSettingsUseCase.execute();

      const { status } = await MediaLibrary.getPermissionsAsync();

      if (status === "granted") {
        const trackRepo = new SqliteTrackRepository(db);
        const artistRepo = new SqliteArtistRepository(db);
        const albumRepo = new SQLiteAlbumRepository(db);
        const playlistRepo = new SqlitePlaylistRepository(db);
        const queueRepo = new SqlitePlaybackQueueRepository(db);

        const syncUseCase = new SyncLibraryUseCase(trackRepo, artistRepo, albumRepo);
        const playlistUseCase = new CreateInitialPlaylistsUseCase(playlistRepo, trackRepo);
        const initQueueUseCase = new InitializeQueueUseCase(queueRepo, trackRepo);

        await syncUseCase.execute((percent) => {
          if (percent % 20 === 0) console.log(`[Sync] ${percent}%`);
        });

        await playlistUseCase.execute();
        await initQueueUseCase.execute();
        await settingsRepo.set("isFirstLaunch", "false");
      }

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  },
};