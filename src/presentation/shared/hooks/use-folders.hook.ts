import { useState, useCallback, useEffect } from "react";
import { useSQLiteContext } from "expo-sqlite";
import { Folder } from "@entities/folder.entity";
import { SqliteFolderRepository } from "@repositories/sqlite-folder.repository";
import { GetAllFoldersUseCase } from "@use-cases/folders/get-all-folders.use-case";

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