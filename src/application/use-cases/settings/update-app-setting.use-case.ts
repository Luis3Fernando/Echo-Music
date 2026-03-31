import { AppSettingsRepository } from "@interfaces/app-settings.repository";

export class UpdateAppSettingUseCase {
  constructor(private repository: AppSettingsRepository) {}

  async execute(key: string, value: any): Promise<void> {
    await this.repository.set(key, String(value));
  }
}