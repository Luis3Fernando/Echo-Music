// Usamos require para asegurar compatibilidad con Metro
const jsmediatags = require('jsmediatags');

export const extractMetadataFromFile = (fileUri) => {
  return new Promise((resolve, reject) => {
    new jsmediatags.Reader(fileUri).read({
      onSuccess: (tag) => {
        resolve({
          artist: tag.tags.artist || "Unknown Artist",
          album: tag.tags.album || "Unknown Album",
          genre: tag.tags.genre || "Unknown Genre",
          year: tag.tags.year ? parseInt(tag.tags.year) : null,
          // Aquí podríamos extraer el artwork más adelante
        });
      },
      onError: (error) => {
        reject(error);
      },
    });
  });
};