import { useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
  Animated,
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
  const menuWidth = 210;
  const screenPadding = 16;
  const verticalOffset = 10;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isVisible) {
      Animated.timing(opacity, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }).start();
    } else {
      opacity.setValue(0);
    }
  }, [isVisible]);

  const isRightHalf = anchorPosition.x > SCREEN_WIDTH / 2;
  const isBottomHalf = anchorPosition.y > SCREEN_HEIGHT / 2;

  let leftPos = isRightHalf ? anchorPosition.x - menuWidth : anchorPosition.x;
  const finalLeft = Math.max(
    screenPadding,
    Math.min(leftPos, SCREEN_WIDTH - menuWidth - screenPadding),
  );

  const dynamicStyles = {
    top: isBottomHalf ? undefined : anchorPosition.y + verticalOffset,
    bottom: isBottomHalf
      ? SCREEN_HEIGHT - anchorPosition.y + verticalOffset
      : undefined,
    left: finalLeft,
  };

  return (
    <Modal
      transparent={true}
      visible={isVisible}
      animationType="none"
      onRequestClose={onClose}
      hardwareAccelerated={true}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <Animated.View
            style={[
              styles.menuCard,
              dynamicStyles,
              { width: menuWidth, opacity: opacity },
            ]}
          >
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
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.03)",
  },
  menuCard: {
    position: "absolute",
    backgroundColor: Colors.white,
    borderRadius: 12,
    paddingVertical: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 8,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 13,
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#F2F2F2",
  },
  iconStyle: {
    marginRight: 12,
    width: 20,
    textAlign: "center",
  },
  itemText: {
    flex: 1,
    fontSize: 14,
    fontWeight: "500",
  },
});
