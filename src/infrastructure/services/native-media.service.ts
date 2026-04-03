import * as MediaLibrary from "expo-media-library";

export const nativeMediaService = {
  async fetchAllAudioFiles() {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== "granted") {
      throw new Error("Permisos de lectura de medios denegados");
    }

    const media = await MediaLibrary.getAssetsAsync({
      mediaType: "audio",
      first: 50,
    });

    const filteredAssets = media.assets.filter((asset) => {
      const durationSeconds = asset.duration || 0;
      return durationSeconds >= 30;
    });

    console.log(
      `[NativeMedia] Encontrados: ${media.assets.length} | Filtrados (música): ${filteredAssets.length}`,
    );

    return filteredAssets;
  },
};
