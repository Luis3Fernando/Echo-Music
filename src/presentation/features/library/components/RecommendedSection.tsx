import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Dimensions,
  StyleSheet,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from "react-native";
import { Colors } from "@theme/colors";
import Banner from "../../../components/atoms/Banner";
import SectionTitle from "@/presentation/components/atoms/SectionTitle";

const { width } = Dimensions.get("window");
const ITEM_WIDTH = width - 20;

const RecommendedSection = ({ data }: { data: any[] }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = event.nativeEvent.contentOffset.x / slideSize;
    setActiveIndex(Math.round(index));
  };

  return (
    <View style={styles.container}>
      <SectionTitle title="Canciones recomendadas" />
      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={ITEM_WIDTH + 10}
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
      <View style={styles.pagination}>
        {data.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              activeIndex === index ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginTop: 10 },
  listContent: {
    paddingHorizontal: 10,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
  },
  dot: {
    height: 4,
    borderRadius: 2,
    marginHorizontal: 3,
  },
  activeDot: {
    width: 15,
    backgroundColor: Colors.primary,
  },
  inactiveDot: {
    width: 4,
    backgroundColor: Colors.darkGrey,
  },
});

export default RecommendedSection;
