import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/core/theme/colors";

interface FolderItemProps {
  name: string;
  path: string;
  onPress: () => void;
}

const FolderItem = ({ name, path, onPress }: FolderItemProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.6}>
      <View style={styles.iconContainer}>
        <Ionicons name="folder" size={24} color="#666" />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.folderName} numberOfLines={1}>
          {name}
        </Text>
        <Text style={styles.folderPath} numberOfLines={1}>
          {path}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    marginVertical: 8,
  },
  iconContainer: {
    width: 48,
    height: 48,
    backgroundColor: "#F0F0F0",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  infoContainer: {
    flex: 1,
    marginLeft: 15,
    justifyContent: "center",
  },
  folderName: {
    fontSize: 14,
    fontWeight: "500",
    color: Colors.black,
  },
  folderPath: {
    fontSize: 12,
    color: "#888",
    marginTop: 2,
  },
});

export default FolderItem;