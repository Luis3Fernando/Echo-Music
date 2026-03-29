import { useToast } from "react-native-toast-notifications";

export const useAppToast = () => {
  const toast = useToast();

  const showInfo = (message: string) => {
    toast.show(message, {
      type: "normal",
      placement: "bottom",
      duration: 3500,
      animationType: "slide-in",
    });
  };

  const showError = (message: string) => {
    toast.show(message, {
      type: "danger",
      placement: "bottom",
      duration: 4000,
      animationType: "zoom-in",
    });
  };

  const showSuccess = (message: string) => {
    toast.show(message, {
      type: "success",
      placement: "bottom",
      duration: 3000,
      animationType: "slide-in",
    });
  };

  return { showInfo, showError, showSuccess };
};
