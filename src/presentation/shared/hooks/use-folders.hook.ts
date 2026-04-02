import { useState, useCallback, useEffect } from "react";
import { useSQLiteContext } from "expo-sqlite";
import { Folder } from "@entities/folder.entity";
import { SqliteFolderRepository } from "@repositories/sqlite-folder.repository";
import { GetAllFoldersUseCase } from "@use-cases/folders/get-all-folders.use-case";
import { GetTracksByFolderUseCase } from "@use-cases/folders/get-tracks-by-folder.use-case";
import { Track } from "@entities/track.entity";
import { useAppConfigStore } from "@store/use-config.store";

export const useFolders = () => {
  const db = useSQLiteContext();
  const [folders, setFolders] = useState<Folder[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchFolders = useCallback(async () => {
    setIsLoading(true);
    try {
      const repo = new SqliteFolderRepository(db);
      const useCase = new GetAllFoldersUseCase(repo);
      const data = await useCase.execute();
      setFolders(data);
    } catch (error) {
      console.error("[useFolders] Error:", error);
    } finally {
      setIsLoading(false);
    }
  }, [db]);

  useEffect(() => {
    fetchFolders();
  }, [fetchFolders]);

  return { folders, isLoading, refreshFolders: fetchFolders };
};

export const useFolderDetail = (folderPath: string) => {
  const db = useSQLiteContext();
  const [tracks, setTracks] = useState<Track[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const sortOrder = useAppConfigStore((state) => state.config.playlistSortOrder);

  const loadTracks = useCallback(async () => {
    if (!folderPath) return;
    setIsLoading(true);
    try {
      const repo = new SqliteFolderRepository(db);
      const useCase = new GetTracksByFolderUseCase(repo);
      
      const data = await useCase.execute(folderPath, sortOrder);
      setTracks(data);
    } catch (error) {
      console.error("[useFolderDetail] Error:", error);
    } finally {
      setIsLoading(false);
    }
  }, [db, folderPath, sortOrder]);

  useEffect(() => {
    loadTracks();
  }, [loadTracks]);
  return { tracks, setTracks, isLoading, refresh: loadTracks };
};