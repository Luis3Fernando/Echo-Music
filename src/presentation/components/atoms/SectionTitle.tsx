import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { Colors } from '@theme/colors';

interface SectionTitleProps {
  title: string;
  isDark?: boolean;
}

const SectionTitle = ({ title }: SectionTitleProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    marginVertical: 4,
  },
  title: {
    color: Colors.black, 
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: -0.5,
    textTransform: 'none',
    opacity: 0.8,
  },
});

export default SectionTitle;