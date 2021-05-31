import React from 'react'
import PropTypes from 'prop-types'
import {
  connect,
} from 'react-redux'
import Button from '@material-ui/core/Button'

import {
  closeSnackbar as closeSnackbarAction,
} from 'actions/ui'

export const SnackDismissButton = ({
  closeSnackbar,
  itemKey,
}) => (
  <Button
      onClick={() => closeSnackbar(itemKey)}
      color="inherit"
      size="small"
    >
    Dismiss
  </Button>
)

SnackDismissButton.propTypes = {
  closeSnackbar: PropTypes.func.isRequired,
  itemKey: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
}

export const mapStateToDispatch = () => ({
})

export const mapDispatchToProps = {
  closeSnackbar: closeSnackbarAction,
}

export default connect(mapStateToDispatch, mapDispatchToProps)(SnackDismissButton)
