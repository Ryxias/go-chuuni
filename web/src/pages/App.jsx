import React from 'react'
import PropTypes from 'prop-types'
import {
  connect,
} from 'react-redux'
import {
  makeStyles,
} from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import {
  SnackbarProvider,
} from 'notistack'

import AppHeader from 'containers/AppHeader'
import AppDrawer from 'containers/AppDrawer'
import Footer from 'containers/Footer'
import Notifier from 'containers/Notifier'

export const useStyles = makeStyles(theme => ({
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  appBarSpacer: theme.mixins.toolbar,
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}))

export const App = ({
  children,
}) => {
  const classes = useStyles()
  return (
    <SnackbarProvider maxSnack={12}>
      <AppHeader />
      <AppDrawer />
      <div className={classes.content}>
        <main>
          <div className={classes.appBarSpacer} />
          <Container
              maxWidth={false}
              className={classes.container}
            >
            {children}
          </Container>
        </main>
        <Footer />
      </div>
      <Notifier />
    </SnackbarProvider>
  )
}

App.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
}

App.defaultProps = {
  children: null,
}

export const mapStateToProps = () => ({
})

export const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
