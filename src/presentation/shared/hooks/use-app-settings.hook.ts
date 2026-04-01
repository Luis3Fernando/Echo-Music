import { useCallback } from "react";
import { useSQLiteContext } from "expo-sqlite";
import { SqliteAppSettingsRepository } from "@repositories/sqlite-app-settings.repository";
import { UpdateAppSettingUseCase } from "@use-cases/settings/update-app-setting.use-case";
import { AppConfig } from "@entities/app-config.entity";
import { useAppConfigStore } from "@/presentation/store/use-config.store";

export const useAppSettings = () => {
  const db = useSQLiteContext();
  const config = useAppConfigStore((state) => state.config);
  const isLoading = useAppConfigStore((state) => state.isLoading);
  const updateConfigKey = useAppConfigStore((state) => state.updateConfigKey);

  const updateSetting = useCallback(async (key: keyof AppConfig, value: any) => {
    try {
      updateConfigKey(key, value);
      const repo = new SqliteAppSettingsRepository(db);
      const useCase = new UpdateAppSettingUseCase(repo);
      await useCase.execute(key, value);
    } catch (error) {
      console.error("[useAppSettings] Error al persistir:", error);
    }
  }, [db, updateConfigKey]);

  return { config, updateSetting, isLoading };
};