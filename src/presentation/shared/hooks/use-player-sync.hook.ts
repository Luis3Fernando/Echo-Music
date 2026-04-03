import { useEffect } from 'react';
import TrackPlayer, { Event, useTrackPlayerEvents } from 'react-native-track-player';
import { usePlayerStore } from '@store/use-player.store';
import { usePlayerActions } from './use-player-actions.hook';

export const usePlayerSync = () => {
  const { queue } = usePlayerStore();
  const { jumpToIndex } = usePlayerActions();

  // Escuchamos cuando el motor nativo cambia de track (ej. botón 'Next' de la notificación)
  useTrackPlayerEvents([Event.PlaybackActiveTrackChanged], async (event) => {
    if (event.type === Event.PlaybackActiveTrackChanged && event.index != null) {
      // Si el índice nativo no coincide con el de nuestro estado, lo sincronizamos
      if (queue && event.index !== queue.currentIndex) {
        console.log(`[Sync] Sincronizando UI al track índice: ${event.index}`);
        await jumpToIndex(event.index);
      }
    }
  });

  // (Opcional pero recomendado) Sincronizar estado al montar
  useEffect(() => {
    const syncInitialState = async () => {
      const state = await TrackPlayer.getPlaybackState();
      // Aquí puedes inicializar UI extra si lo necesitas al abrir la app
    };
    syncInitialState();
  }, []);
};