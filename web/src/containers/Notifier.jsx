import React from 'react'
import PropTypes from 'prop-types'
import {
  connect,
} from 'react-redux'
import {
  withSnackbar,
} from 'notistack'

import {
  getNotifications,
} from 'selectors/ui'
import {
  removeSnackbar as removeSnackbarAction,
} from 'actions/ui'
import SnackDismissButton from 'containers/SnackDismissButton'

export class Notifier extends React.Component {
  static propTypes = {
    notifications: PropTypes.array.isRequired,
    closeSnackbar: PropTypes.func.isRequired,
    enqueueSnackbar: PropTypes.func.isRequired,
    removeSnackbar: PropTypes.func.isRequired,
  }

  shouldComponentUpdate ({
    notifications: newSnacks = [],
  }) {
    if (!newSnacks.length) {
      this.displayed = {}
      return false
    }
    const {
      notifications: currentSnacks,
    } = this.props
    let notExists = false
    for (let i = 0; i < newSnacks.length; i++) {
      const newSnack = newSnacks[i]
      if (newSnack.dismissed) {
        this.props.closeSnackbar(newSnack.key)
        this.props.removeSnackbar(newSnack.key)
      }
      if (notExists) {
        continue
      }
      notExists = notExists || !currentSnacks.filter(({ key }) => newSnack.key === key).length
    }
    return notExists
  }

  componentDidUpdate () {
    const {
      notifications = []
    } = this.props
    notifications.forEach(({
      key,
      message,
      options = {},
    }) => {
      if (this.displayed[key]) {
        return
      }
      const action = (
        <SnackDismissButton itemKey={key} />
      )
      this.props.enqueueSnackbar(message, {
        action,
        ...options,
        onClose: (event, reason, k) => {
          if (options.onClose) {
            options.onClose(event, reason, k)
          }
        },
      })
      this.storeDisplayed(key)
    })
  }

  displayed = {}

  storeDisplayed = (id) => {
    this.displayed = {
      ...this.displayed,
      [id]: true,
    }
  }

  render () {
    return null
  }
}

export const mapStateToProps = (state, ownProps) => ({
  notifications: getNotifications(state, ownProps),
})

export const mapDispatchToProps = {
  removeSnackbar: removeSnackbarAction,
}

export default withSnackbar(connect(mapStateToProps, mapDispatchToProps)(Notifier))
