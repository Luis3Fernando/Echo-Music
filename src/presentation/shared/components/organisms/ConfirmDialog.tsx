import { StyleSheet, Text, View, Modal } from "react-native";
import { Colors } from "@theme/colors";
import { Spacing } from "@theme/spacing";
import { Button } from "@components/atoms/Button";

interface ConfirmDialogProps {
  isVisible: boolean;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  isDestructive?: boolean;
}

export const ConfirmDialog = ({
  isVisible,
  title,
  description,
  confirmLabel = "Aceptar",
  cancelLabel = "Cancelar",
  onConfirm,
  onCancel,
  isDestructive = false,
}: ConfirmDialogProps) => {
  return (
    <Modal
      transparent={true}
      visible={isVisible}
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View style={styles.overlay}>
        <View style={styles.dialogCard}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{title}</Text>
            {description && (
              <Text style={styles.description}>{description}</Text>
            )}
          </View>
          <View style={styles.buttonRow}>
            <Button
              title={cancelLabel}
              variant="outline"
              onPress={onCancel}
              style={styles.flexButton}
              textColor={Colors.primary}
            />
            <View style={{ width: Spacing.md }} />
            <Button
              title={confirmLabel}
              onPress={onConfirm}
              style={[
                styles.flexButton,
              ]}
              textColor={isDestructive ? Colors.white : Colors.black}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center", 
    alignItems: "center",
    padding: Spacing.xl,
  },
  dialogCard: {
    width: "100%",
    maxWidth: 340,
    backgroundColor: Colors.white,
    borderRadius: 24,
    padding: Spacing.xl,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 15,
  },
  textContainer: {
    marginBottom: Spacing.lg,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.black,
    textAlign: "center",
    marginBottom: Spacing.sm,
  },
  description: {
    fontSize: 15,
    color: "#666",
    textAlign: "center",
    lineHeight: 22,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  flexButton: {
    flex: 1,
    paddingHorizontal: 0,
    borderRadius: 12, 
  },
});