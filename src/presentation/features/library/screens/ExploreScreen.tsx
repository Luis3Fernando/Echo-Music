import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../styles/ExploreStyles';
import RecommendedSection from '@components/organisms/RecommendedSection';
import { Colors } from '@theme/colors';
import { useRecommendations } from '@/logic/hooks/useRecommendations';

const ExploreScreen = () => {
  const { recommendedTracks, loading } = useRecommendations();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Explorar</Text>
          <View style={styles.headerIndicator} />
        </View>
        <TouchableOpacity style={styles.searchButton}>
          <Ionicons name="search-outline" size={28} color={Colors.black} />
        </TouchableOpacity>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color={Colors.primary} style={{ marginTop: 50 }} />
      ) : (
        <RecommendedSection data={recommendedTracks} />
      )}
    </ScrollView>
  );
};

export default ExploreScreen;