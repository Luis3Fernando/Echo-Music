import { useEffect, useRef } from "react";
import { useProgress } from "react-native-track-player";
import { usePlayerStore } from "@store/use-player.store";
import { useSQLiteContext } from "expo-sqlite";
import { SqliteTrackRepository } from "@repositories/sqlite-track.repository";
import { IncrementPlayCountUseCase } from "@use-cases/player/increment-play-count.use-case";

export const TrackProgressTracker = () => {
  const db = useSQLiteContext();
  const { position, duration } = useProgress(1000);
  const currentTrack = usePlayerStore((s) => s.currentTrack);

  const hasCounted = useRef<string | null>(null);

  useEffect(() => {
    if (!currentTrack || duration <= 0) return;
    if (hasCounted.current !== currentTrack.id) {
    }

    const threshold = duration * 0.3;

    if (position >= threshold && hasCounted.current !== currentTrack.id) {
      handleIncrement();
    }
  }, [position, duration, currentTrack?.id]);

  const handleIncrement = async () => {
    if (!currentTrack) {
      console.log("[PlayCount] No hay un track actual para incrementar.");
      return;
    }

    console.log(
      `[PlayCount] Intentando incrementar para: ${currentTrack.title} (ID: ${currentTrack.id})`,
    );

    hasCounted.current = currentTrack.id;

    try {
      const repo = new SqliteTrackRepository(db);
      const useCase = new IncrementPlayCountUseCase(repo);

      await useCase.execute(currentTrack.id);
      console.log("[PlayCount] Incremento exitoso en la Base de Datos SQLite.");

      const newCount = (currentTrack.playCount || 0) + 1;

      usePlayerStore
        .getState()
        .updateTrackInStore(currentTrack.id, { playCount: newCount });

      console.log(
        `[PlayCount] Estado de Zustand actualizado. Nuevo conteo: ${newCount}`,
      );
    } catch (error) {
      console.error(
        "[PlayCount] Error durante el proceso de incremento:",
        error,
      );
    }
  };

  return null;
};
