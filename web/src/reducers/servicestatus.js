import {
  SERVICE_STATUS_REQUEST,
  SERVICE_STATUS_SUCCESS,
  SERVICE_STATUS_FAILURE,
} from 'constants/servicestatus'

export const getDefaultState = () => ({
  message: 'Checking...',
  whoami: '',
})

export default (state = getDefaultState(), action) => {
  if (action.type === SERVICE_STATUS_REQUEST) {
    // middleware prevents this from ever getting hit, I think?
    return {
      ...state,
      whoami: '',
      message: 'Checking...',
    }
  }
  if (action.type === SERVICE_STATUS_SUCCESS) {
    return {
      ...state,
      message: action.response.status,
      whoami: action.response.whoami,
    }
  }
  if (action.type === SERVICE_STATUS_FAILURE) {
    return {
      ...state,
      message: 'ERROR!',
    }
  }
  return state
}
