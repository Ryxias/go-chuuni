export default theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },

  layout: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },

  'layout-home': {
    width: 'auto',
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up(1100 + theme.spacing(3) * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },

  paper: {
    // marginTop: theme.spacing(8),
    // marginBottom: theme.spacing(6),
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(2),
    overflow: 'auto',
  },

  'paper--list-item': {
    marginBottom: theme.spacing(2),
  },

  'form-layout': {
    width: 'auto',
    display: 'block',
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up(400 + theme.spacing(3) * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
})
