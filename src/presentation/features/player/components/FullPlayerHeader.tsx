import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@theme/colors';

interface Props {
  activeTab: 'player' | 'lyrics';
  setActiveTab: (tab: 'player' | 'lyrics') => void;
  onClose: () => void;
}

const FullPlayerHeader = ({ activeTab, setActiveTab, onClose }: Props) => (
  <View style={styles.header}>
    <TouchableOpacity onPress={onClose} style={styles.headerButton}>
      <Ionicons name="chevron-down" size={30} color={Colors.black} />
    </TouchableOpacity>
    <View style={styles.tabActions}>
      <TouchableOpacity onPress={() => setActiveTab('player')} style={styles.headerButton}>
        <Ionicons 
          name={activeTab === 'player' ? "musical-notes" : "musical-notes-outline"} 
          size={26} 
          color={activeTab === 'player' ? Colors.primary : "#A0A0A0"} 
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setActiveTab('lyrics')} style={styles.headerButton}>
        <Ionicons 
          name={activeTab === 'lyrics' ? "text" : "text-outline"} 
          size={26} 
          color={activeTab === 'lyrics' ? Colors.primary : "#A0A0A0"} 
        />
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  header: {
    height: 70,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 20,
  },
  tabActions: { flexDirection: "row", gap: 15 },
  headerButton: { padding: 10, justifyContent: "center", alignItems: "center" },
});

export default FullPlayerHeader;