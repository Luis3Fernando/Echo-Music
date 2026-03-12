import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  Platform,
  TouchableOpacity,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as Yup from "yup";
import { Spacing } from "@theme/spacing";
import { DynamicForm } from "@components/organisms/DynamicForm";
import { Colors } from "@theme/colors";
import { Ionicons } from "@expo/vector-icons";

const PLAYLIST_FIELDS: any[] = [
  {
    name: "artworkUri",
    label: "Portada:",
    type: "image",
  },
  {
    name: "name",
    label: "Nombre de la playlist:",
    placeholder: "Ej: Música para estudiar",
    type: "text",
  },
];

const PlaylistSchema = Yup.object().shape({
  name: Yup.string().min(3, "¡Muy corto!").required("El nombre es obligatorio"),
});

const PlaylistFormScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<any>();

  const { playlist } = route.params || {};
  const isEditing = !!playlist;

  const handleSubmit = (values: any) => {
    console.log("Datos finales (Payload):", values);
    navigation.goBack();
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
    >
      <View style={styles.topNavigationRow}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={28} color="#1A1A1A" />
        </TouchableOpacity>
        <View style={styles.titleWrapper}>
          <Text style={styles.headerTitle} numberOfLines={1}>
            {isEditing ? "Editar playlist" : "Nueva playlist"}
          </Text>
        </View>
        <View style={{ width: 40 }} />
      </View>
      <View style={styles.card}>
        <DynamicForm
          fields={PLAYLIST_FIELDS}
          initialValues={{
            name: playlist?.name || "",
            artworkUri: playlist?.artworkUri || null,
          }}
          validationSchema={PlaylistSchema}
          onSubmit={handleSubmit}
          submitLabel={isEditing ? "Guardar cambios" : "Crear playlist"}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  scrollContent: {
    padding: Spacing.xl,
    paddingTop: Platform.OS === "ios" ? 70 : 50,
  },
  card: {
    borderRadius: 24,
  },
  topNavigationRow: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    marginBottom: 25,
    paddingHorizontal: 10,
  },
  backButton: {
    width: 40,
    justifyContent: "center",
  },
  titleWrapper: {
    flex: 1,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: Colors.black,
  },
});

export default PlaylistFormScreen;
