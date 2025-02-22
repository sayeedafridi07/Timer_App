import { Dimensions, PixelRatio } from "react-native";

// Screen Constants
// based on iPhone X scale
const SCREEN_HEIGHT = 812;
const SCREEN_WIDTH = 375;

const { width, height } = Dimensions.get("window");

/**
 * Function to scale a value based on the size of the screen size and the original
 * size used on the design.
 **/
export default function scale(units = 1) {
  return (width / SCREEN_WIDTH) * units;
}

const fontSize = (units = 1) => (width / SCREEN_WIDTH) * units;
const verticalScale = (size) => (height / SCREEN_HEIGHT) * size;

const HP = (percent = 0) => {
  return Math.round(height * (percent / 100));
};

const WP = (percent = 0) => {
  return Math.round(width * (percent / 100));
};

export const WINDOW = { width, height };
export const ScreenWidth = width;
export const ScreenHeight = height;

// Based on iPhone 5s's scale
const scaleFactor = width / 320;

export function normalize(size) {
  const newSize = size * scaleFactor;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
}

export { verticalScale, fontSize, HP, WP };
