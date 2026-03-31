import { useState, useCallback } from "react";
import { useSQLiteContext } from "expo-sqlite";
import { SqliteArtistRepository } from "@repositories/sqlite-artist.repository";
import { DeezerMusicService } from "@services/deezer-music.service";
import { GetOrCreateArtistUseCase } from "@use-cases/artists/get-or-create-artist.use-case";
import { UpdateArtistImageUseCase } from "@use-cases/artists/update-artist-image.use-case";
import { Artist } from "@entities/artist.entity";

const artistCache: Record<string, Artist> = {};

export const useArtist = () => {
  const db = useSQLiteContext();
  const [loading, setLoading] = useState(false);

  const fetchArtist = useCallback(
    async (name: string): Promise<Artist | null> => {
      if (!name) return null;

      if (artistCache[name]) {
        return artistCache[name];
      }

      setLoading(true);
      try {
        const repo = new SqliteArtistRepository(db);
        const api = new DeezerMusicService();
        const useCase = new GetOrCreateArtistUseCase(repo, api);

        const result = await useCase.execute(name);

        if (result) {
          artistCache[name] = result;
        }

        return result;
      } catch (error) {
        console.error("[useArtist] Error:", error);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [db],
  );

  const updateImage = useCallback(
    async (artistId: string, temporaryUri: string): Promise<string | null> => {
      try {
        const repo = new SqliteArtistRepository(db);
        const useCase = new UpdateArtistImageUseCase(repo);

        const permanentUri = await useCase.execute(artistId, temporaryUri);

        const cachedName = Object.keys(artistCache).find(
          (name) => artistCache[name].id === artistId,
        );
        if (cachedName && artistCache[cachedName]) {
          artistCache[cachedName] = {
            ...artistCache[cachedName],
            pictureUrl: permanentUri,
          };
        }

        return permanentUri;
      } catch (error) {
        console.error("[useArtist] Error:", error);
        return null;
      }
    },
    [db],
  );

  return { fetchArtist, updateImage, loading };
};
