import { useState, useCallback, useEffect } from "react";
import { useSQLiteContext } from "expo-sqlite";
import { SqliteAppSettingsRepository } from "@repositories/sqlite-app-settings.repository";
import { InitializeAppSettingsUseCase } from "@use-cases/settings/initialize-app-settings.use-case";
import { UpdateAppSettingUseCase } from "@use-cases/settings/update-app-setting.use-case";
import { AppConfig, DEFAULT_APP_CONFIG } from "@entities/app-config.entity";

export const useAppSettings = () => {
  const db = useSQLiteContext();
  const [config, setConfig] = useState<AppConfig>(DEFAULT_APP_CONFIG);
  const [isLoading, setIsLoading] = useState(true);

  const loadConfig = useCallback(async () => {
    try {
      const repo = new SqliteAppSettingsRepository(db);
      const useCase = new InitializeAppSettingsUseCase(repo);
      const data = await useCase.execute();
      setConfig(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [db]);

  const updateSetting = async (key: keyof AppConfig, value: any) => {
    try {
      const repo = new SqliteAppSettingsRepository(db);
      const useCase = new UpdateAppSettingUseCase(repo);
      await useCase.execute(key, value);
      
      setConfig(prev => ({ ...prev, [key]: value }));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadConfig();
  }, [loadConfig]);

  return { config, updateSetting, isLoading };
};