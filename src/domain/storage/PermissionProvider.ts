import * as MediaLibrary from 'expo-media-library';

export const PermissionProvider = {
  async requestAudioPermissions(): Promise<boolean> {
    const { status: existingStatus, canAskAgain } = await MediaLibrary.getPermissionsAsync();
    
    if (existingStatus === 'granted') return true;

    if (canAskAgain) {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      return status === 'granted';
    }

    return false;
  },

  async requestNotificationPermissions(): Promise<boolean> {
    return true; 
  }
};