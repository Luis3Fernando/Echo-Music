import * as MediaLibrary from "expo-media-library";

export const nativeMediaService = {
  async fetchAllAudioFiles() {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== "granted") {
      throw new Error("Permisos de lectura de medios denegados");
    }

    const media = await MediaLibrary.getAssetsAsync({
      mediaType: "audio",
      first: 20,
    });

    return media.assets;
  },
};
