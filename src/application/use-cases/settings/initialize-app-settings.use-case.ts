import { AppSettingsRepository } from "@interfaces/app-settings.repository";
import { DEFAULT_APP_CONFIG, AppConfig } from "@entities/app-config.entity";

export class InitializeAppSettingsUseCase {
  constructor(private repository: AppSettingsRepository) {}

  async execute(): Promise<AppConfig> {
    const storedSettings = await this.repository.getAll();
    const config: any = {};

    for (const [key, defaultValue] of Object.entries(DEFAULT_APP_CONFIG)) {
      if (storedSettings[key] === undefined) {
        await this.repository.set(key, String(defaultValue));
        config[key] = defaultValue;
      } else {
        const value = storedSettings[key];
        if (typeof defaultValue === "boolean") config[key] = value === "true";
        else if (typeof defaultValue === "number") config[key] = Number(value);
        else config[key] = value;
      }
    }

    return config as AppConfig;
  }
}