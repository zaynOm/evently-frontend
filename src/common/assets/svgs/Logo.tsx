import { forwardRef } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box, BoxProps } from '@mui/material';

interface LogoProps extends BoxProps {
  id: string;
  disabledLink?: boolean;
}
const Logo = forwardRef<HTMLDivElement, LogoProps>(
  ({ id, disabledLink = false, sx, ...other }, ref) => {
    const theme = useTheme();

    const PRIMARY_LIGHT = theme.palette.primary.light;

    const PRIMARY_MAIN = theme.palette.primary.main;

    const _PRIMARY_DARK = theme.palette.primary.dark;

    // OR using local (public folder)
    // -------------------------------------------------------
    const logo = (
      <Box
        ref={ref}
        component="div"
        sx={{ width: 170, height: 40, cursor: 'pointer', ...sx }}
        {...other}
      >
        <svg
          id={id}
          width="100%"
          height="100%"
          viewBox="0 0 482 57"
          fill={id === 'footer-logo' ? PRIMARY_LIGHT : PRIMARY_MAIN}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.680001 57V0.552H60.392V9.768H13.352V23.016H49.256V32.52H13.352V47.784H60.776L64.616 55.944C64.616 56.2 63.752 56.456 62.024 56.712C60.296 56.904 57.32 57 53.096 57H0.680001ZM94.704 57L67.92 0.647999H81.36L99.408 39.528L102 46.44H102.864L105.36 39.528L123.6 0.647999H136.656L135.12 6.408L110.064 57H94.704ZM145.787 57V0.552H205.5V9.768H158.459V23.016H194.364V32.52H158.459V47.784H205.884L209.724 55.944C209.724 56.2 208.86 56.456 207.132 56.712C205.404 56.904 202.428 57 198.204 57H145.787ZM220.708 57V8.232L219.748 0.552H233.572L266.212 34.728L269.956 39.912H271.012V0.552H283.684V57H271.492L238.084 22.248L234.34 17.736H233.38V57H220.708ZM318.816 57L318.72 9.672H293.76V0.455996H356.544V9.672H331.488V57H318.816ZM366.636 57L367.596 49.32V0.552H380.268V47.784H420.012L423.852 55.944C423.852 56.2 422.988 56.456 421.26 56.712C419.532 56.904 416.556 57 412.332 57H366.636ZM440.719 57V33.576L412.783 0.552H428.143L442.351 18.504L446.767 24.456H447.727L452.143 18.504L466.351 0.552H481.711L477.967 6.312L453.391 33.96V57H440.719Z"
            fill={id === 'footer-logo' ? PRIMARY_LIGHT : PRIMARY_MAIN}
          />
        </svg>
      </Box>
    );

    if (disabledLink) {
      return <>{logo}</>;
    }

    return <>{logo}</>;
  }
);

export default Logo;
