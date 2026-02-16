import { Platform } from 'react-native';

const theme = {
  colors: {
    textPrimary: '#24292e',
    textSecondary: '#586069',
    primary: '#0366d6',
  },
  fontSizes: {
    body: 14,
    subheading: 16,
  },
  fonts: {
    main:
      Platform.OS === 'android'
        ? 'Roboto'
        : Platform.OS === 'ios'
          ? 'Arial'
          : 'System',
  },
  fontWeights: {
    normal: '400',
    bold: '700',
  },
   content: {
    padding: 16,
    gap: 4,
    backgroundColor: 'white',
  },
}

export default theme;