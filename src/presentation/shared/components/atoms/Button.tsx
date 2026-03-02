import React from "react";
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from "react-native";
import { Colors } from "@/core/theme/colors";
import { Spacing } from "@/core/theme/spacing";

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "outline" | "ghost";
  style?: ViewStyle;
  textColor?: string;
  disabled?: boolean;
}

export const Button = ({
  title,
  onPress,
  variant = "primary",
  style,
  textColor,
  disabled,
}: ButtonProps) => {
  const isPrimary = variant === "primary";

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      disabled={disabled}
      style={[
        styles.button,
        !isPrimary && styles.buttonOutline,
        disabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.text,
          !isPrimary && styles.textOutline,
          textColor ? { color: textColor } : null,
        ]}
      >
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
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  buttonOutline: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: Colors.primary,
    elevation: 0,
  },
  disabled: {
    opacity: 0.5,
    backgroundColor: "#cccccc",
    borderColor: "#aaaaaa",
  },
  text: {
    color: Colors.black,
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
  textOutline: {
    color: Colors.primary,
  },
});
