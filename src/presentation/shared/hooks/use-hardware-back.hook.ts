import { useCallback } from 'react';
import { BackHandler } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

export const useHardwareBack = (onBackAction?: () => boolean) => {
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      const handleBackPress = () => {
        if (onBackAction) {
          const wasHandled = onBackAction();
          if (wasHandled) return true;
        }
        if (navigation.canGoBack()) {
          navigation.goBack();
          return true;
        }
        return false;
      };

      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        handleBackPress
      );

      return () => subscription.remove();
    }, [onBackAction, navigation])
  );
};