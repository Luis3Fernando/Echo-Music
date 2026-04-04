import * as MediaLibrary from "expo-media-library";

export const nativeMediaService = {
  async fetchAllAudioFiles() {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== "granted") {
      throw new Error("Permisos de lectura de medios denegados");
    }

    const media = await MediaLibrary.getAssetsAsync({
      mediaType: "audio",
      first: 10,
    });

    const filteredAssets = media.assets.filter((asset) => {
      const durationSeconds = asset.duration || 0;
      return durationSeconds >= 30;
    });

    return filteredAssets;
  },
};
