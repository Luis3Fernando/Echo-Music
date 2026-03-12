import { useState, useEffect } from "react";
import { getColors } from "react-native-image-colors";

const darkenColor = (hex: string, amount: number) => {
  let color = hex.replace(/#/g, "");
  if (color.length === 3)
    color = color
      .split("")
      .map((s) => s + s)
      .join("");
  const num = parseInt(color, 16);
  let r = (num >> 16) - amount;
  let g = ((num >> 8) & 0x00ff) - amount;
  let b = (num & 0x0000ff) - amount;

  const clamp = (val: number) => Math.min(255, Math.max(0, val));

  return (
    "#" +
    ((clamp(r) << 16) | (clamp(g) << 8) | clamp(b))
      .toString(16)
      .padStart(6, "0")
  );
};

export const useImageAccentColor = (
  imageUri: string | null | undefined,
  fallback = "#2d2d2d",
) => {
  const [colors, setColors] = useState({ main: fallback, dark: fallback });

  useEffect(() => {
    if (!imageUri) {
      setColors({ main: fallback, dark: fallback });
      return;
    }

    const fetchColors = async () => {
      try {
        const result = await getColors(imageUri, {
          fallback,
          cache: true,
          key: imageUri,
        });

        let selected = fallback;
        if (result.platform === "android") {
          selected = result.vibrant || result.dominant || fallback;
        } else if (result.platform === "ios") {
          selected = result.background || result.primary || fallback;
        }

        setColors({
          main: selected,
          dark: darkenColor(selected, 80),
        });
      } catch (e) {
        setColors({ main: fallback, dark: fallback });
      }
    };

    fetchColors();
  }, [imageUri, fallback]);

  return colors;
};
