import React, { useState } from 'react';
import { View, Text, FlatList, Dimensions, StyleSheet, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { Colors } from '@theme/colors';
import Banner from '../atoms/Banner';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width - 20; // Ajuste para ver un poco del siguiente item

const RecommendedSection = ({ data }: { data: any[] }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = event.nativeEvent.contentOffset.x / slideSize;
    setActiveIndex(Math.round(index));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Canciones Recomendadas</Text>
      
      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={ITEM_WIDTH + 10} // Snap al ancho del item + gap
        decelerationRate="fast"
        onScroll={onScroll}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={{ width: ITEM_WIDTH, marginRight: 10 }}>
            <Banner 
              type={item.type} 
              data={item.data} 
              onPress={() => console.log("Play", item.data.title)} 
            />
          </View>
        )}
      />

      {/* Indicador de posición (Puntos) */}
      <View style={styles.pagination}>
        {data.map((_, index) => (
          <View 
            key={index} 
            style={[
              styles.dot, 
              activeIndex === index ? styles.activeDot : styles.inactiveDot
            ]} 
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginTop: 10 },
  label: {
    color: Colors.textSecondary,
    fontSize: 11,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 5,
    paddingHorizontal: 15, // Alineado con el header
  },
  listContent: {
    paddingHorizontal: 10, // Ese padding de 1 casi pegado al borde
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  dot: {
    height: 4,
    borderRadius: 2,
    marginHorizontal: 3,
  },
  activeDot: {
    width: 15, // Alargado para toque moderno/punk
    backgroundColor: Colors.primary,
  },
  inactiveDot: {
    width: 4,
    backgroundColor: Colors.darkGrey,
  },
});

export default RecommendedSection;