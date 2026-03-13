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
  const menuWidth = 210;

  const dynamicStyles = {
    top: isBottom ? undefined : anchorPosition.y + 10,
    bottom: isBottom ? SCREEN_HEIGHT - anchorPosition.y + 10 : undefined,
    left: Math.min(
      anchorPosition.x - menuWidth + 40,
      SCREEN_WIDTH - menuWidth - 15,
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
            {items.map((item, index) => {
              const isDanger = item.variant === "danger";
              const contentColor = isDanger ? "#E53935" : "#555555";
              return (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.menuItem,
                    index === items.length - 1 && { borderBottomWidth: 0 },
                  ]}
                  onPress={() => {
                    item.onPress();
                    onClose();
                  }}
                  activeOpacity={0.6}
                >
                  {item.icon && (
                    <Ionicons
                      name={item.icon as any}
                      size={20}
                      color={contentColor}
                      style={styles.iconStyle}
                    />
                  )}
                  <Text style={[styles.itemText, { color: contentColor }]}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.02)", 
  },
  menuCard: {
    position: "absolute",
    backgroundColor: Colors.white,
    borderRadius: 10, 
    paddingVertical: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 15,
    elevation: 10,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#F0F0F0",
  },
  iconStyle: {
    marginRight: 12,
    width: 22,
    textAlign: "center",
  },
  itemText: {
    flex: 1,
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 20,
  },
});
