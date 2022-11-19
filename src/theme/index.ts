import { createTheme } from '@mui/material/styles'
import { red } from '@mui/material/colors'

// Create a theme instance.
export default createTheme({
  palette: {
    primary: {
      main: '#587597',
    },
    secondary: {
      main: '#305497',
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
    MuiTable: {
      styleOverrides: {
        root: {
          // backgroundColor: Colors.mainWhite,
          // boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.05)',
          // minWidth: '900px',
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          // backgroundColor: Colors.mainBlack,
          // minWidth: '900px',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          // lineHeight: '20px',
          // textAlign: 'left',
          // wordBreak: 'break-all',
          // maxWidth: '200px',
          // padding: '10px',
        },
        head: {
          // color: Colors.mainBlack,
          // textAlign: 'left',
          // fontWeight: '700',
          // fontSize: '14px',
          // lineHeight: '20px',
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        // root: { height: '60px' },
      },
    },
    MuiTableBody: {
      styleOverrides: {
        root: {
          // border: '1px solid rgba(0, 0, 0, 0.05)',
          // boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.05)',
          // minWidth: '900px',
        },
      },
    },
  },
  typography: {
    fontFamily: 'Arial, Helvetica, sans-serif',
    h1: {
      fontSize: 28,
      fontWeight: 600,
    },
    h2: {
      fontSize: 24,
      fontWeight: 500,
    },
    h3: {
      fontSize: 22,
      fontWeight: 700,
    },
    h4: {
      fontSize: 20,
      fontWeight: 600,
    },
    h5: {
      fontSize: 18,
      fontWeight: 700,
    },
    h6: {
      fontSize: 16,
      fontWeight: 600,
    },
    body1: {
      fontSize: 12,
      fontWeight: 400,
    },
    body2: {
      fontSize: 11,
      fontWeight: 400,
    },
    overline: {
      fontSize: '14px',
      lineHeight: '22px',
      fontWeight: 400,
      textTransform: 'initial',
    },
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
