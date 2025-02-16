import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const getFontSize = (size) => {
    if (width < 360) {
        // Smaller devices
        return size * 0.95;
    } else if (width >= 360 && width < 768) {
        // Medium devices
        return size;
    } else {
        // Larger devices like iPads
        return size * 1.25;
    }
};
