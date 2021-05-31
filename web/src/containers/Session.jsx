import React from 'react'
import PropTypes from 'prop-types'
import {
  connect,
} from 'react-redux'
import CssBaseline from '@material-ui/core/CssBaseline'
import {
  withStyles,
  ThemeProvider,
  createMuiTheme,
} from '@material-ui/core/styles'

import LoadingIndicator from 'components/LoadingIndicator'
import Modal from 'containers/Modal'
import {
  getInProgress,
} from 'selectors/loading'
import {
  getIsModalOpen,
  getBrightness,
} from 'selectors/ui'
import {
  LOADING_INDICATOR_HIDE_DELAY,
  BRIGHTNESS_LIGHT,
  BRIGHTNESS_DARK,
} from 'constants/ui'
import darkTheme from 'stylesheets/darkTheme'
import {
  loadTheme as loadThemeAction,
  setBrightness as setBrightnessAction,
} from 'actions/ui'

export const styles = () => ({
  root: {
    display: 'flex',
  },
})

export class Session extends React.Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]).isRequired,
    inProgress: PropTypes.bool.isRequired,
    isModalOpen: PropTypes.bool.isRequired,
    brightness: PropTypes.oneOf([
      BRIGHTNESS_LIGHT,
      BRIGHTNESS_DARK,
    ]),
  }

  constructor (props) {
    super(props)
    this.loadingTimer = null
  }

  componentWillMount () {
    this.props.loadTheme().then((result) => {
      this.props.setBrightness(result.response || this.props.brightness)
    })
  }

  state = {
    isLoading: false,
  }

  componentWillReceiveProps (newProps) {
    if (newProps.inProgress && !this.state.isLoading) {
      clearInterval(this.loadingTimer)
      this.setState({
        isLoading: true
      })
    } else if (!newProps.inProgress && this.state.isLoading) {
      clearInterval(this.loadingTimer)
      this.loadingTimer = setTimeout(() => {
        this.setState({
          isLoading: false,
        })
      }, LOADING_INDICATOR_HIDE_DELAY)
    }
  }

  render () {
    const theme = createMuiTheme({
      palette: {
        ...(this.props.brightness === BRIGHTNESS_DARK && darkTheme),
      },
    })
    return (
      <ThemeProvider {...{ theme }}>
        <div className={this.props.classes.root}>
          <CssBaseline />
          {this.props.children}
          {this.state.isLoading && (
            <LoadingIndicator />
          )}
          {this.props.isModalOpen && (
            <Modal />
          )}
        </div>
      </ThemeProvider>
    )
  }
}

export const mapStateToProps = (state, ownProps) => ({
  inProgress: getInProgress(state, ownProps),
  isModalOpen: getIsModalOpen(state, ownProps),
  brightness: getBrightness(state, ownProps),
})

export const mapDispatchToProps = {
  loadTheme: loadThemeAction,
  setBrightness: setBrightnessAction,
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Session))
