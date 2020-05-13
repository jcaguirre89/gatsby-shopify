export const breakpoints = {
  s: '400px',
  m: '700px',
  l: '900px',
};

const theme = {
  breakpoints,
  colors: {
    greys: {
      black: '#000',
      veryDark: '#333333',
      dark: '#4f4f4f',
      medium: '#828282',
      light: '#bdbdbd',
      veryLight: '#e0e0e0',
      white: '#fff',
    },
    primary: {
      veryDark: '#473404',
      dark: '#775707',
      medium: '#eead0e',
      light: '#f3c656',
      veryLight: '#f8de9f',
    },
    secondary: {
      veryDark: '#323F49',
      dark: '#4A5E6D',
      medium: '#7C9DB6',
      light: '#96B1C5',
      veryLight: '#e5ebf0',
    },
    accent: {
      veryDark: '#2c125a',
      dark: '#3e197d',
      medium: '#5824b3',
      light: '#8a66ca',
      veryLight: '#bca7e1',
    },
  },
  fonts: {
    heading: 'Playfair Display, serif',
    body: 'Spartan, sans serif',
    monospace: 'Menlo, monospace',
  },
  fontWeights: {
    body: 400,
    heading: 700,
    bold: 700,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.125,
  },
  maxWidth: '1000px',
  bs: '0 12px 24px 0 rgba(0, 0, 0, 0.09)',
};

export default theme;
