import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@theme/colors';

interface ScreenHeaderProps {
  title: string;
  onActionPress?: () => void;
  showAction?: boolean;
}

const ScreenHeader = ({ title, onActionPress, showAction = true }: ScreenHeaderProps) => {
  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.headerTitle}>{title}</Text>
        <View style={styles.headerIndicator} />
      </View>
      
      {showAction && (
        <TouchableOpacity 
          style={styles.actionButton} 
          onPress={onActionPress}
          activeOpacity={0.7}
        >
          <Ionicons name="reorder-three-outline" size={32} color={Colors.black} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 34,
    color: Colors.black,
    fontWeight: '700',
    letterSpacing: -1.5,
  },
  headerIndicator: {
    height: 6,
    width: 30,
    backgroundColor: Colors.primary,
    borderRadius: 20,
    marginTop: -5,
  },
  actionButton: {
    padding: 5,
  },
});

export default ScreenHeader;