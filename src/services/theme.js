import 'typeface-roboto'
import { createMuiTheme } from '@material-ui/core/styles'
import lightBlue from '@material-ui/core/colors/lightBlue'


// const primary = lightBlue[500]
const primary = '#0099ff'
const secondary = lightBlue[900]

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: primary,
    },
    secondary: {
      main: secondary,
    },
  },
  typography: {
    fontFamily: 'Roboto',
  },
  status: {
    danger: 'orange',
  },
})
