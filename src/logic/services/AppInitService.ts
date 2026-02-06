import * as MediaLibrary from 'expo-media-library';
import { initDatabase } from '@database/SQLiteClient';
import { ScannerService } from '@/logic/services/ScannerService';

export const AppInitService = {
  async init() {
    try {
      await initDatabase();
      const { status } = await MediaLibrary.getPermissionsAsync();
      
      if (status === 'granted') {
        console.log("Permisos detectados, iniciando escaneo silencioso...");
        ScannerService.startFullScan();
      } else {
        console.log("Sin permisos de música. El escaneo se omitirá hasta el Onboarding.");
      }

      console.log("Sistema inicializado correctamente");
      return true;
    } catch (error) {
      console.error("Error crítico al inicializar la app:", error);
      return false;
    }
  }
};