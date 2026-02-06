import { initDatabase } from '@database/SQLiteClient';

export const AppInitService = {
  async init() {
    try {
      await initDatabase();
      console.log("Sistema inicializado correctamente");
      return true;
    } catch (error) {
      console.error("Error crítico al inicializar la app:", error);
      return false;
    }
  }
};