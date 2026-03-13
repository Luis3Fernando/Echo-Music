import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import { Colors } from "@theme/colors";
import { Ionicons } from "@expo/vector-icons";

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");

export interface MenuItem {
  label: string;
  icon?: string;
  onPress: () => void;
  variant?: "default" | "danger";
}

interface MenuPopoverProps {
  isVisible: boolean;
  onClose: () => void;
  items: MenuItem[];
  anchorPosition: { x: number; y: number };
}

export const MenuPopover = ({
  isVisible,
  onClose,
  items,
  anchorPosition,
}: MenuPopoverProps) => {
  const isBottom = anchorPosition.y > SCREEN_HEIGHT / 2;
  const menuWidth = 180;
  const dynamicStyles = {
    top: isBottom ? undefined : anchorPosition.y + 10,
    bottom: isBottom ? SCREEN_HEIGHT - anchorPosition.y + 10 : undefined,
    left: Math.min(
      anchorPosition.x - menuWidth + 20,
      SCREEN_WIDTH - menuWidth - 20,
    ),
  };

  return (
    <Modal
      transparent={true}
      visible={isVisible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <View style={[styles.menuCard, dynamicStyles, { width: menuWidth }]}>
            {items.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.menuItem,
                  index === items.length - 1 && { borderBottomWidth: 0 },
                  { flexDirection: "row", alignItems: "center" },
                ]}
                onPress={() => {
                  item.onPress();
                  onClose();
                }}
              >
                {item.icon && (
                  <Ionicons
                    name={item.icon as any}
                    size={18}
                    color={item.variant === "danger" ? "#E53935" : "#666"}
                    style={{ marginRight: 12 }}
                  />
                )}
                <Text
                  style={[
                    styles.itemText,
                    item.variant === "danger" && { color: "#E53935" },
                  ]}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "transparent",
  },
  menuCard: {
    position: "absolute",
    backgroundColor: Colors.white,
    borderRadius: 14,
    paddingVertical: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  menuItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#F0F0F0",
  },
  itemText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#1A1A1A",
  },
});
