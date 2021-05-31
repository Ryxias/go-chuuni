import React from 'react'
import PropTypes from 'prop-types'
import {
  connect,
} from 'react-redux'
import Dialog from '@material-ui/core/Dialog'

// import modalRegistry from 'modals'
import {
  closeModal as closeModalAction,
} from 'actions/ui'
import {
  getModalName,
} from 'selectors/ui'

export class Modal extends React.Component {
  static propTypes = {
    modalName: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
  }

  render () {
    // const ModalContent = modalRegistry[this.props.modalName]
    return (
      <Dialog
          open
          onClose={this.props.onClose}
        >
        {/* <ModalContent /> */}
      </Dialog>
    )
  }
}

export const mapStateToProps = (state, ownProps) => ({
  modalName: getModalName(state, ownProps),
})

export const mapDispatchToProps = {
  onClose: closeModalAction,
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal)
