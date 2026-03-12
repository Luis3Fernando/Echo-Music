import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { Colors } from '@theme/colors';

interface ScreenHeaderProps {
  title: string;
  showBack?: boolean;
  showOptions?: boolean;
  onBackPress?: () => void;
  onOptionsPress?: () => void;
  variant?: 'light' | 'dark';
}

export const ScreenHeaderBasic = ({ 
  title, 
  showBack = true, 
  showOptions = false, 
  onBackPress, 
  onOptionsPress,
  variant = 'dark' 
}: ScreenHeaderProps) => {
  
  const iconColor = variant === 'dark' ? Colors.white : "#1A1A1A";
  const textColor = variant === 'dark' ? Colors.white : "#1A1A1A";

  return (
    <View style={styles.topNavigationRow}>
      {showBack ? (
        <TouchableOpacity style={styles.backButton} onPress={onBackPress}>
          <Ionicons name="chevron-back" size={28} color={iconColor} />
        </TouchableOpacity>
      ) : (
        <View style={styles.backButton} />
      )}
      <View style={styles.titleWrapper}>
        <Text style={[styles.headerTitle, { color: textColor }]} numberOfLines={1}>
          {title}
        </Text>
      </View>
      {showOptions ? (
        <TouchableOpacity style={styles.actionButton} onPress={onOptionsPress}>
          <Ionicons name="ellipsis-vertical" size={22} color={iconColor} />
        </TouchableOpacity>
      ) : (
        <View style={styles.actionButton} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  topNavigationRow: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    paddingHorizontal: 10,
  },
  backButton: { 
    width: 40, 
    justifyContent: "center" 
  },
  titleWrapper: { 
    flex: 1, 
    alignItems: "center" 
  },
  headerTitle: { 
    fontSize: 17, 
    fontWeight: "700" 
  },
  actionButton: { 
    width: 40, 
    alignItems: "flex-end", 
    justifyContent: "center" 
  },
});