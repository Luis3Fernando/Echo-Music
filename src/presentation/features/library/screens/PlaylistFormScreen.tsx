import {
  StyleSheet,
  View,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as Yup from "yup";
import { Colors } from "@theme/colors";
import { Spacing } from "@theme/spacing";
import { DynamicForm } from "@components/organisms/DynamicForm";
import { ScreenHeaderBasic } from "@components/molecules/ScreenHeaderBasic";
import { useCreatePlaylist } from "@hooks/use-playlists.hook";
import { useHardwareBack } from "@hooks/use-hardware-back.hook";

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
  name: Yup.string().required("El nombre es obligatorio"),
});

const PlaylistFormScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<any>();
  const { createPlaylist, isCreating } = useCreatePlaylist();

  const { playlist } = route.params || {};
  const isEditing = !!playlist;

  useHardwareBack(() => {
    navigation.goBack();
    return true;
  });

  const handleSubmit = async (values: any) => {
    if (isEditing) {
    } else {
      await createPlaylist(values.name, values.artworkUri);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScreenHeaderBasic
        title={isEditing ? "Editar playlist" : "Nueva playlist"}
        showBack={true}
        onBackPress={() => navigation.goBack()}
        variant="light"
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
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
          {isCreating && (
            <View style={styles.loaderContainer}>
              <ActivityIndicator size="large" color={Colors.primary} />
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingTop: 30,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.xxl,
  },
  card: {
    borderRadius: 24,
  },
  loaderContainer: {
    marginTop: 20,
    alignItems: "center",
  },
});

export default PlaylistFormScreen;
