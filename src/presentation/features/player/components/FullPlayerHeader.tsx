import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@theme/colors';

interface FullPlayerHeaderProps {
  onClose: () => void;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
}

const FullPlayerHeader = ({ 
  onClose, 
  isFavorite = false, 
  onToggleFavorite 
}: FullPlayerHeaderProps) => {

  const handleFavoritePress = () => {
    console.log("Evento: Toggle Favorito");
    if (onToggleFavorite) onToggleFavorite();
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onClose} style={styles.headerButton}>
        <Ionicons name="chevron-down" size={30} color="#ffffff" />
      </TouchableOpacity>
      <View style={styles.titleContainer}>
        <Text style={styles.headerTitle}>Reproductor</Text>
      </View>
      <TouchableOpacity onPress={handleFavoritePress} style={styles.headerButton}>
        <Ionicons 
          name={isFavorite ? "heart" : "heart-outline"} 
          size={26} 
          color={isFavorite ? Colors.secondary : "#ffffff"} 
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    marginTop: 10,
    width: '100%',
  },
  headerButton: {
    padding: 10,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  titleContainer: {
    flex: 1,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: "#e3e3e3",
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
});

export default FullPlayerHeader;