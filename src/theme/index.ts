import { createTheme } from '@mui/material/styles'
import { red } from '@mui/material/colors'

// Create a theme instance.
export default createTheme({
  palette: {
    primary: {
      main: '#FFCB05', //must be your primary color
    },
    secondary: {
      main: '#000000', //must be your secondary color
    },
    error: {
      main: red.A400,
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      smSmall: 500,
      sm: 600,
      mdSmall: 770,
      md: 990,
      lg: 1170,
      xl: 1400,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          //styles
        },
      },
    },
  },
  typography: {
    fontFamily: 'Roboto',
    // h1: {
    //   fontSize: 28,
    //   fontWeight: 600,
    // },
    // h2: {
    //   fontSize: 22,
    //   fontWeight: 500,
    // },
    // h3: {
    //   fontSize: 24,
    //   lineHeight: '32px',
    //   fontWeight: 700,
    // },
    // h4: {
    //   fontSize: 16,
    //   fontWeight: 600,
    //   lineHeight: '24px',
    // },
    // h5: {
    //   fontSize: 20,
    //   fontWeight: 700,
    //   lineHeight: '24px',
    // },
    // h6: {
    //   fontSize: 16,
    //   fontWeight: 600,
    //   lineHeight: '20px',
    // },
    // body1: {
    //   fontSize: 16,
    //   fontWeight: 400,
    //   lineHeight: '28px',
    // },
    // body2: {
    //   fontSize: 14,
    //   lineHeight: '16px',
    //   fontWeight: 400,
    // },
    // overline: {
    //   fontSize: '14px',
    //   lineHeight: '22px',
    //   fontWeight: 400,
    //   textTransform: 'initial',
    // },
  },
})

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: true
    smSmall: true
    sm: true
    mdSmall: true
    md: true
    lg: true
    xl: true
  }
}
