import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Button } from "@/presentation/components/atoms/Button";
import { usePermissions } from "@hooks/usePermissions";
import { styles } from "../styles/OnboardingScreen.styles";

const STEPS = [
  {
    title: "Bienvenido a",
    highlight: "Echo Music",
    desc: "La mejor experiencia para gestionar y escuchar tu música local.",
  },
  {
    title: "Organiza tu",
    highlight: "biblioteca",
    desc: "Escaneo automático de archivos de alta calidad como FLAC y MP3.",
  },
  {
    title: "Acceso a tu",
    highlight: "música",
    desc: "Necesitamos tu autorización para acceder a los archivos de audio del dispositivo.",
  },
  {
    title: "Todo listo para",
    highlight: "Empezar",
    desc: "Ya puedes disfrutar de una reproducción fluida y personalizada.",
  },
];

const OnboardingScreen = ({ navigation }: any) => {
  const [currentStep, setCurrentStep] = useState(0);
  const { askForPermissions, loading, isGranted } = usePermissions();

  const isPermissionStep = currentStep === 2;
  const isLastStep = currentStep === STEPS.length - 1;

  const handleNext = async () => {
    if (isPermissionStep && !isGranted) {
      const success = await askForPermissions();
      if (success) {
        setCurrentStep(currentStep + 1);
      } else {
        Alert.alert(
          "Permisos Necesarios",
          "Para continuar, Echo Music requiere acceso a tus archivos de audio desde los ajustes del sistema.",
          [{ text: "Entendido" }]
        );
      }
      return;
    }

    if (isLastStep) {
      navigation.replace("Main");
      return;
    }

    setCurrentStep(currentStep + 1);
  };

  const getButtonTitle = () => {
    if (loading) return "PROCESANDO...";
    if (isPermissionStep && !isGranted) return "AUTORIZAR ACCESO";
    if (isLastStep) return "EMPEZAR AHORA";
    return "SIGUIENTE";
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require("@assets/img/handset.jpg")}
          style={styles.image}
        />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>
          {STEPS[currentStep].title}
          {"\n"}
          <Text style={styles.titleAccent}>{STEPS[currentStep].highlight}</Text>
        </Text>
        <Text style={styles.description}>{STEPS[currentStep].desc}</Text>
        <View style={styles.pagination}>
          {STEPS.map((_, i) => (
            <View
              key={i}
              style={[styles.dot, currentStep === i && styles.activeDot]}
            />
          ))}
        </View>
      </View>
      <SafeAreaView style={styles.footer}>
        <Button
          title={getButtonTitle()}
          onPress={handleNext}
          style={styles.buttonOverride}
          textColor="white"
          disabled={loading}
        />
        {loading && (
          <ActivityIndicator color="white" style={{ marginTop: 10 }} />
        )}
      </SafeAreaView>
    </View>
  );
};

export default OnboardingScreen;