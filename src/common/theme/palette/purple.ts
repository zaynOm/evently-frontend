import CustomPalette from '@common/theme/palette/type';
import { alpha } from '@mui/material/styles';

const GREY = {
  0: '#FFFFFF',
  50: '#F9FAFB',
  100: '#F5F7FA',
  200: '#EDF0F5',
  300: '#DEE3ED',
  400: '#C5CEDC',
  500: '#9AABC9',
  600: '#6D82A8',
  700: '#485D85',
  800: '#2E3F61',
  900: '#1A2642',
  A100: '#D9E0EC',
  A200: '#A9BAD3',
  A400: '#6D82A8',
  A700: '#485D85',
};

const PRIMARY = {
  lighter: '#EFE8FD',
  light: '#BEA0F9',
  main: '#7E3FF2',
  dark: '#5A2CB0',
  darker: '#3D1F78',
  contrastText: '#FFFFFF',
};

const SECONDARY = {
  lighter: '#E2F8F6',
  light: '#89E5DE',
  main: '#19C7B9',
  dark: '#0F9187',
  darker: '#08625C',
  contrastText: '#FFFFFF',
};

const INFO = {
  lighter: '#DCEEFF',
  light: '#74BFFF',
  main: '#0D7EE8',
  dark: '#0955AA',
  darker: '#063672',
  contrastText: '#FFFFFF',
};

const SUCCESS = {
  lighter: '#E3F9E8',
  light: '#7DE197',
  main: '#23B04B',
  dark: '#178339',
  darker: '#0F582A',
  contrastText: '#FFFFFF',
};

const WARNING = {
  lighter: '#FFF6E0',
  light: '#FFD380',
  main: '#FFA319',
  dark: '#CC7A00',
  darker: '#8A5200',
  contrastText: GREY[800],
};

const ERROR = {
  lighter: '#FEEAED',
  light: '#F9A0AB',
  main: '#E94057',
  dark: '#BB2B3F',
  darker: '#7D1728',
  contrastText: '#FFFFFF',
};

const palette: CustomPalette = {
  common: { black: '#000', white: '#fff' },
  primary: PRIMARY,
  secondary: SECONDARY,
  info: INFO,
  success: SUCCESS,
  warning: WARNING,
  error: ERROR,
  grey: GREY,
  divider: alpha(GREY[500], 0.24),
  text: {
    primary: GREY[800],
    secondary: GREY[600],
    disabled: GREY[500],
  },
  background: {
    paper: '#FFFFFF',
    default: GREY[100],
    neutral: GREY[200],
  },
  action: {
    active: GREY[600],
    hover: alpha(GREY[500], 0.08),
    selected: alpha(GREY[500], 0.16),
    disabled: alpha(GREY[500], 0.8),
    disabledBackground: alpha(GREY[500], 0.24),
    focus: alpha(GREY[500], 0.24),
    hoverOpacity: 0.08,
    disabledOpacity: 0.48,
  },
};

export default palette;
