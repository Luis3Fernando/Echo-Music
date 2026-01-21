import { Colors } from '@/theme/colors';
import { Spacing } from '@/theme/spacing';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';


interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'outline' | 'ghost';
  style?: ViewStyle; 
}

export const Button = ({ title, onPress, variant = 'primary', style }: ButtonProps) => {
  const isPrimary = variant === 'primary';
  
  return (
    <TouchableOpacity 
      style={[styles.button, !isPrimary && styles.buttonOutline, style]} 
      onPress={onPress}
    >
      <Text style={[styles.text, !isPrimary && styles.textOutline]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xl,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  text: {
    color: Colors.black,
    fontSize: 16,
    fontWeight: 'bold',
  },
  textOutline: {
    color: Colors.primary,
  },
});