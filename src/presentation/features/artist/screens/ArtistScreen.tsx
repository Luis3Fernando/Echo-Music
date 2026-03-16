import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, ScrollView, ActivityIndicator } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Colors } from "@theme/colors";
import { useArtist } from "@hooks/use-artist.hook";
import { Artist } from "@entities/artist.entity";
import ArtistHeaderSection from "../components/ArtistHeaderSection";
import ArtistInfoSection from "../components/ArtistInfoSection";

const ArtistScreen = () => {
  const route = useRoute<any>();
  const navigation = useNavigation();
  const { name } = route.params;

  const { fetchArtist, loading } = useArtist();
  const [artistData, setArtistData] = useState<Artist | null>(null);

  useEffect(() => {
    fetchArtist(name).then(setArtistData);
  }, [name]);

  if (loading && !artistData) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
        
        <ArtistHeaderSection
          pictureUrl={artistData?.pictureUrl}
          onBackPress={() => navigation.goBack()}
        />

        <View style={styles.contentCard}>
          <ArtistInfoSection 
            name={name}
            songCount={124}
            duration="8h 45m"
            onPlayPress={() => console.log("Reproducir todo")}
            onShufflePress={() => console.log("Modo aleatorio")}
          />

          <View style={styles.placeholderSection}>
            <Text style={styles.sectionTitle}>Canciones populares</Text>
            <Text style={{color: '#999', marginTop: 10}}>Listando éxitos de {name}...</Text>
          </View>
        </View>

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentCard: {
    backgroundColor: Colors.white,
    marginTop: -50,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: 25,
    paddingTop: 35,
    minHeight: 600,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -15 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 20,
  },
  placeholderSection: {
    marginTop: 35,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.black,
    marginBottom: 15
  }
});

export default ArtistScreen;