import { StyleSheet, View, ScrollView, SafeAreaView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as Yup from "yup";
import { Colors } from "@theme/colors";
import { Spacing } from "@theme/spacing";
import { DynamicForm } from "@components/organisms/DynamicForm";
import { ScreenHeaderBasic } from "@components/molecules/ScreenHeaderBasic";

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
    <SafeAreaView style={styles.safeArea}>
      <ScreenHeaderBasic
        title={isEditing ? "Editar playlist" : "Nueva playlist"}
        showBack={true}
        onBackPress={() => navigation.goBack()}
        variant="light" 
      />
      <ScrollView 
        style={styles.container} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
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
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingTop: 30
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
});

export default PlaylistFormScreen;