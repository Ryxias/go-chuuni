import React from 'react'
import PropTypes from 'prop-types'
import {
  connect,
} from 'react-redux'
import AppBar from '@material-ui/core/AppBar'
import clsx from 'clsx'
import {
  makeStyles,
} from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Typography from '@material-ui/core/Typography'
import LightThemeIcon from '@material-ui/icons/BrightnessHigh'
import DarkThemeIcon from '@material-ui/icons/Brightness4'

import {
  BRIGHTNESS_LIGHT,
  BRIGHTNESS_DARK,
} from 'constants/ui'
import {
  drawerWidth,
} from 'containers/AppDrawer'
import {
  getBrightness,
  getIsDrawerOpen,
} from 'selectors/ui'
import {
  openDrawer as openDrawerAction,
  setBrightness as setBrightnessAction,
} from 'actions/ui'

export const useStyles = makeStyles(theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create([
      'width',
      'margin',
    ], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create([
      'width',
      'margin',
    ], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  toolbar: {
    paddingRight: 24,
  },
  title: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
}))

const AppHeader = ({
  isDrawerOpen,
  openDrawer,
  brightness,
  setBrightness,
}) => {
  const classes = useStyles()
  return (
    <AppBar
        position="absolute"
        color="default"
        className={clsx(classes.appBar, isDrawerOpen && classes.appBarShift)}
      >
      <Toolbar className={classes.toolbar}>
        <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={openDrawer}
            className={clsx(classes.menuButton, isDrawerOpen && classes.menuButtonHidden)}
          >
          <MenuIcon />
        </IconButton>
        <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
          Chuuni.me
        </Typography>
        <IconButton
            color="inherit"
            onClick={() => setBrightness(brightness === BRIGHTNESS_LIGHT ? BRIGHTNESS_DARK : BRIGHTNESS_LIGHT)}
          >
          {brightness === BRIGHTNESS_LIGHT && <DarkThemeIcon />}
          {brightness === BRIGHTNESS_DARK && <LightThemeIcon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

AppHeader.propTypes = {
  isDrawerOpen: PropTypes.bool.isRequired,
  openDrawer: PropTypes.func.isRequired,
  setBrightness: PropTypes.func.isRequired,
  brightness: PropTypes.oneOf([
    BRIGHTNESS_LIGHT,
    BRIGHTNESS_DARK,
  ]),
}

export const mapStateToProps = (state, ownProps) => ({
  isDrawerOpen: getIsDrawerOpen(state, ownProps),
  brightness: getBrightness(state, ownProps),
})

export const mapDispatchToProps = {
  openDrawer: openDrawerAction,
  setBrightness: setBrightnessAction,
}

export default connect(mapStateToProps, mapDispatchToProps)(AppHeader)
