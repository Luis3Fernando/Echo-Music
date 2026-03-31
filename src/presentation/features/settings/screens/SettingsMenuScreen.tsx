import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Linking,
  Image,
  BackHandler,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@theme/colors";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import SettingOption from "@components/molecules/SettingOption";
import { useCallback } from "react";
import { useAppSettings } from "@hooks/use-app-settings.hook";

const SettingsMenuScreen = () => {
  const navigation = useNavigation<any>();
  const currentYear = new Date().getFullYear();
  const { config, updateSetting, isLoading } = useAppSettings();

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        navigation.goBack();
        return true;
      };
      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress,
      );
      return () => subscription.remove();
    }, [navigation]),
  );

  const openURL = (url: string) => {
    Linking.openURL(url).catch((err) =>
      console.error("Error al abrir URL:", err),
    );
  };

  if (isLoading) return null;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={28} color={Colors.black} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Configuración</Text>
        <View style={{ width: 28 }} />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.profileSection}>
          <View style={styles.logoContainer}></View>
          <Text style={styles.appName}>Echo Music</Text>
          <Text style={styles.appVersion}>Seed 1.0.0</Text>
        </View>

        <Text style={styles.sectionLabel}>Reproductor</Text>
        <View style={styles.card}>
          <SettingOption
            icon="shuffle"
            iconBgColor="#5856D6"
            title="Aleatorio siempre"
            description="El modo aleatorio no se desactivará al reproducir una lista nueva."
            value={config.shuffleAlways}
            onValueChange={(val) => updateSetting("shuffleAlways", val)}
          />
          <View style={styles.separator} />
          <SettingOption
            icon="infinite"
            iconBgColor="#FF9500"
            title="Crossfade"
            description="Permite una transición suave entre canciones sin silencios."
            value={config.crossfadeDuration > 0}
            onValueChange={(val) =>
              updateSetting("crossfadeDuration", val ? 5 : 0)
            }
          />
        </View>
        <Text style={styles.sectionLabel}>Sobre la app</Text>
        <View style={styles.card}>
          <View style={styles.sysariSection}>
            <View style={styles.sysariInfo}>
              <Text style={styles.devBy}>Desarrollado por:</Text>
              <View style={styles.sysariBrandRow}>
                <Image
                  source={require("@assets/icon/sysari-logo.png")}
                  style={styles.logoSysari}
                  resizeMode="contain"
                />
                <Text style={styles.sysariName}>Sysari</Text>
              </View>
              <View style={styles.socialRow}>
                <TouchableOpacity
                  onPress={() =>
                    openURL("https://www.linkedin.com/company/sysari")
                  }
                >
                  <Ionicons
                    name="logo-linkedin"
                    size={28}
                    color={Colors.gray}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => openURL("https://www.instagram.com/sysari__/")}
                >
                  <Ionicons
                    name="logo-instagram"
                    size={28}
                    color={Colors.gray}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => openURL("https://www.sysari.net/")}
                >
                  <Ionicons
                    name="globe-outline"
                    size={28}
                    color={Colors.gray}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        <Text style={styles.footerText}>© {currentYear} Echo Music</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light,
    paddingTop: 50,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.black,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  profileSection: {
    alignItems: "center",
    marginBottom: 40,
  },
  logoContainer: {
    width: 80,
    height: 80,
    backgroundColor: Colors.primary,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  appName: {
    fontSize: 26,
    fontWeight: "800",
    color: Colors.black,
    marginTop: 15,
  },
  appVersion: {
    fontSize: 13,
    color: Colors.gray_text,
    marginTop: 4,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.gray_text,
    marginBottom: 12,
    marginLeft: 5,
    letterSpacing: 1.5,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 25,
    marginBottom: 25,
    elevation: 15,
    shadowColor: Colors.gray_light,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  sysariSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  sysariInfo: {
    flex: 1,
    alignItems: "center",
  },
  devBy: {
    fontSize: 12,
    color: "#687076",
    letterSpacing: 1.2,
    fontWeight: "500",
  },
  sysariBrandRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
    gap: 12,
  },
  logoSysari: {
    width: 40,
    height: 40,
  },
  sysariName: {
    fontSize: 24,
    fontWeight: "800",
    color: "#1E1F34",
  },
  socialRow: {
    flexDirection: "row",
    gap: 30,
    marginTop: 25,
  },
  footerText: {
    textAlign: "center",
    color: Colors.gray_light,
    fontSize: 11,
    marginTop: 20,
  },
  separator: {
    height: 1,
    backgroundColor: "#F2F2F2",
    marginHorizontal: 15,
  },
});

export default SettingsMenuScreen;
