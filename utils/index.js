// utils.js
import { Dimensions, PixelRatio } from 'react-native';

// Choose a base width (e.g. 375 is common for iPhone 11-ish)
const BASE_WIDTH = 375;

export function getFontSize(fontSize) {
  const { width } = Dimensions.get('window');
  // Simple ratio based on base width
  const scale = width / BASE_WIDTH;

  // Round to nearest pixel
  const newSize = fontSize * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
}
