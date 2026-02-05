import { useState, useEffect } from 'react';
import { PermissionProvider } from '@/domain/storage/PermissionProvider';

export const usePermissions = () => {
  const [isGranted, setIsGranted] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkInitialPermissions = async () => {
    const audioOk = await PermissionProvider.requestAudioPermissions();
    setIsGranted(audioOk);
    setLoading(false);
  };

  useEffect(() => {
    checkInitialPermissions();
  }, []);

  const askForPermissions = async (): Promise<boolean> => {
    setLoading(true);
    try {
      const audioOk = await PermissionProvider.requestAudioPermissions();
      const notificationsOk = await PermissionProvider.requestNotificationPermissions();
      const finalStatus = audioOk && notificationsOk;
      
      setIsGranted(finalStatus);
      return finalStatus;
    } catch (error) {
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { isGranted, askForPermissions, loading };
};