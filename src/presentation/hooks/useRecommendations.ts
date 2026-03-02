import { useState, useEffect } from 'react';
import { TrackRepository } from '@/domain/repository/TrackRepository';

export const useRecommendations = () => {
  const [recommendedTracks, setRecommendedTracks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const DEFAULT_COVER = require('@assets/img/default_cover.jpg');

  const fetchRandomRecommendations = async () => {
    try {
      setLoading(true);
      const processedTracks = await TrackRepository.getAllProcessed();
      const shuffled = [...processedTracks]
        .sort(() => 0.5 - Math.random())
        .slice(0, 5);

      const formatted = shuffled.map(track => ({
        id: track.id,
        type: 'song',
        data: {
          title: track.title || "Unknown Title",
          subtitle: track.artist || "Unknown Artist",
          image: track.artworkUri ? { uri: track.artworkUri } : DEFAULT_COVER,
        }
      }));
      const finalData = [
        {
          id: 'welcome-banner',
          type: 'welcome',
          data: { title: "Bienvenido", subtitle: "Descubre nuevas canciones" }
        },
        ...formatted
      ];

      setRecommendedTracks(finalData);
    } catch (error) {
      console.error("Error cargando recomendaciones:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomRecommendations();
  }, []);

  return { recommendedTracks, loading, refresh: fetchRandomRecommendations };
};