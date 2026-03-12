import React from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import { useNavigation, useRoute } from '@react-navigation/native';

const PlaylistFormScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<any>();
  const { playlist } = route.params || {};
  const isEditing = !!playlist;

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>
        {isEditing ? `Editando: ${playlist.title}` : 'Crear Nueva Playlist'}
      </Text>

      <Formik
        initialValues={{
          title: playlist?.title || '',
          description: playlist?.description || '',
        }}
        onSubmit={(values) => {
          // Mostramos los datos capturados
          console.log('Datos leídos del form:', values);
          Alert.alert(
            isEditing ? 'Actualizando' : 'Creando', 
            `Nombre: ${values.title}\nDescripción: ${values.description}`
          );
          navigation.goBack();
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View style={styles.formContainer}>
            <Text style={styles.label}>Nombre</Text>
            <TextInput
              onChangeText={handleChange('title')}
              onBlur={handleBlur('title')}
              value={values.title}
              placeholder="Ej. Mis favoritas de Abancay"
              style={styles.input}
            />

            <Text style={styles.label}>Descripción</Text>
            <TextInput
              onChangeText={handleChange('description')}
              onBlur={handleBlur('description')}
              value={values.description}
              placeholder="Escribe algo sobre esta lista..."
              multiline
              style={[styles.input, { height: 80 }]}
            />

            <View style={styles.buttonGap}>
                <Button 
                    onPress={() => handleSubmit()} 
                    title={isEditing ? "Guardar Cambios" : "Confirmar Creación"} 
                />
            </View>
            
            <Button 
                onPress={() => navigation.goBack()} 
                title="Cancelar" 
                color="red"
            />
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 25, backgroundColor: '#FFF' },
  headerTitle: { fontSize: 24, fontWeight: '800', marginBottom: 30, color: '#1A1A1A' },
  formContainer: { gap: 10 },
  label: { fontSize: 14, fontWeight: '600', color: '#666' },
  input: { borderBottomWidth: 1.5, borderColor: '#EEE', paddingVertical: 10, fontSize: 16, marginBottom: 20 },
  buttonGap: { marginBottom: 15 }
});

export default PlaylistFormScreen;