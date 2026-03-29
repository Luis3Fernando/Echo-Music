import { useState, useEffect, useCallback } from "react";
import { useSQLiteContext } from "expo-sqlite";
import { useNavigation } from "@react-navigation/native";
import { Playlist } from "@entities/playlist.entity";
import { Track } from "@entities/track.entity";
import { SqlitePlaylistRepository } from "@repositories/sqlite-playlist.repository";
import { useAppToast } from "@services/toast.service";
import { GetAllPlaylistsUseCase } from "@use-cases/playlists/get-all-playlists.use-case";
import { GetPlaylistByIdUseCase } from "@use-cases/playlists/get-playlist-by-id.use-case";
import { CreatePlaylistUseCase } from "@use-cases/playlists/create-playlist.use-case";
import { UpdatePlaylistUseCase } from "@use-cases/playlists/update-playlist.use-case";


export const usePlaylists = () => {
  const db = useSQLiteContext();
  const [systemPlaylists, setSystemPlaylists] = useState<Playlist[]>([]);
  const [userPlaylists, setUserPlaylists] = useState<Playlist[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPlaylists = useCallback(async () => {
    setIsLoading(true);
    try {
      const repo = new SqlitePlaylistRepository(db);
      const useCase = new GetAllPlaylistsUseCase(repo);
      const { systemPlaylists, userPlaylists } = await useCase.execute();
      
      setSystemPlaylists(systemPlaylists);
      setUserPlaylists(userPlaylists);
    } catch (error) {
      console.error("[usePlaylists] Error:", error);
    } finally {
      setIsLoading(false);
    }
  }, [db]);

  useEffect(() => {
    fetchPlaylists();
  }, [fetchPlaylists]);

  return { systemPlaylists, userPlaylists, isLoading, refreshPlaylists: fetchPlaylists };
};

export const usePlaylistDetail = (playlistId: string) => {
  const db = useSQLiteContext();
  const [playlist, setPlaylist] = useState<Playlist | null>(null);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadDetail = useCallback(async () => {
    if (!playlistId) return;
    setIsLoading(true);
    try {
      const repo = new SqlitePlaylistRepository(db);
      const useCase = new GetPlaylistByIdUseCase(repo);
      
      const data = await useCase.execute(playlistId);
      setPlaylist(data);

      const playlistTracks = await repo.getTracksByPlaylistId(playlistId);
      setTracks(playlistTracks);
      
    } catch (error) {
      console.error("[usePlaylistDetail] Error:", error);
    } finally {
      setIsLoading(false);
    }
  }, [db, playlistId]);

  useEffect(() => {
    loadDetail();
  }, [loadDetail]);

  return { playlist, tracks, isLoading, refresh: loadDetail };
};

export const useCreatePlaylist = () => {
  const db = useSQLiteContext();
  const navigation = useNavigation();
  const { showSuccess, showError } = useAppToast();
  const [isCreating, setIsCreating] = useState(false);

  const createPlaylist = async (name: string, artworkUri?: string | null) => {
    if (isCreating) return;
    setIsCreating(true);

    try {
      const repo = new SqlitePlaylistRepository(db);
      const useCase = new CreatePlaylistUseCase(repo);

      await useCase.execute({ name, artworkUri });

      showSuccess(`"${name}" creada con éxito`);
      setTimeout(() => {
        navigation.goBack();
      }, 100);

    } catch (error: any) {
      showError(error.message || "Error al crear la playlist");
    } finally {
      setIsCreating(false);
    }
  };

  return { createPlaylist, isCreating };
};

export const useUpdatePlaylist = () => {
  const db = useSQLiteContext();
  const navigation = useNavigation();
  const { showSuccess, showError } = useAppToast();
  const [isUpdating, setIsUpdating] = useState(false);

  const updatePlaylist = async (id: string, name: string, artworkUri?: string | null) => {
    if (isUpdating) return;
    setIsUpdating(true);

    try {
      const repo = new SqlitePlaylistRepository(db);
      const useCase = new UpdatePlaylistUseCase(repo);

      await useCase.execute({ id, name, artworkUri });

      showSuccess("Playlist actualizada");
      
      setTimeout(() => {
        navigation.goBack();
      }, 100);
    } catch (error: any) {
      showError(error.message || "No se pudo actualizar");
    } finally {
      setIsUpdating(false);
    }
  };

  return { updatePlaylist, isUpdating };
};