import { SQLiteDatabase } from "expo-sqlite";
import { AppSettingsRepository } from "@interfaces/app-settings.repository";

export class SqliteAppSettingsRepository implements AppSettingsRepository {
  constructor(private db: SQLiteDatabase) {}

  async get(key: string): Promise<string | null> {
    const row = await this.db.getFirstAsync<{ value: string }>(
      "SELECT value FROM app_settings WHERE key = ?",
      [key]
    );
    return row ? row.value : null;
  }

  async set(key: string, value: string): Promise<void> {
    await this.db.runAsync(
      "INSERT OR REPLACE INTO app_settings (key, value) VALUES (?, ?)",
      [key, value]
    );
  }

  async getAll(): Promise<Record<string, string>> {
    const rows = await this.db.getAllAsync<{ key: string; value: string }>(
      "SELECT * FROM app_settings"
    );
    return rows.reduce((acc, row) => ({ ...acc, [row.key]: row.value }), {});
  }
}