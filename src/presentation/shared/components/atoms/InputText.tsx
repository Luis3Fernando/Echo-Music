import { useState } from "react";
import { View, Text, TextInput, StyleSheet, TextInputProps } from "react-native";
import { Colors } from "@theme/colors";
import { Spacing } from "@theme/spacing";

interface InputTextProps extends TextInputProps {
  label: string;
  error?: string;
  touched?: boolean;
}

export const InputText = ({ 
  label, 
  error, 
  touched, 
  style, 
  ...props 
}: InputTextProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const hasError = touched && error;

  return (
    <View style={styles.container}>
      <Text style={[
        styles.label, 
        isFocused && { color: Colors.primary },
        hasError && styles.labelError
      ]}>
        {label}
      </Text>
      <TextInput
        style={[
          styles.input,
          isFocused && styles.inputFocused,
          hasError && styles.inputError,
          props.multiline && styles.multiline,
          style,
        ]}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholderTextColor="#A0A0A0"
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    width: "100%",
  },
  label: {
    fontSize: 14,
    fontWeight: "700",
    color: "#444",
    marginBottom: Spacing.xs,
    marginLeft: 4,
  },
  labelError: {
    color: Colors.error,
  },
  input: {
    backgroundColor: "#F8F9FA",
    borderRadius: 12,
    paddingHorizontal: Spacing.md,
    paddingVertical: 12,
    fontSize: 16,
    color: Colors.black,
    borderWidth: 1.5,
    borderColor: "#E0E0E0",
  },
  inputFocused: {
    borderColor: Colors.primary,
    backgroundColor: "#FFF",
  },
  inputError: {
    borderColor: Colors.error,
    backgroundColor: Colors.error_background,
  },
  multiline: {
    height: 100,
    textAlignVertical: "top",
  },
});