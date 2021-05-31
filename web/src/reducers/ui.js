import {
  MODAL_OPEN,
  MODAL_CLOSE,
  DRAWER_OPEN,
  DRAWER_CLOSE,
  SNACKBAR_ENQUEUE,
  SNACKBAR_CLOSE,
  SNACKBAR_REMOVE,
  STORE_PARAMS,
  SET_BRIGHTNESS,
  BRIGHTNESS_DARK,
} from 'constants/ui'

export const getDefaultState = () => ({
  modalName: null,
  modalOpen: false,
  modalOptions: {},
  drawerOpen: true,
  notifications: [],
  params: {},
  brightness: BRIGHTNESS_DARK,
})

export default (state = getDefaultState(), action) => {
  if (action.type === STORE_PARAMS) {
    return {
      ...state,
      params: action.params,
    }
  }
  if (action.type === SNACKBAR_ENQUEUE) {
    return {
      ...state,
      notifications: [
        ...state.notifications,
        {
          key: action.key,
          ...action.notification,
        },
      ],
    }
  }
  if (action.type === SNACKBAR_CLOSE) {
    return {
      ...state,
      notifications: state.notifications.map(notification => (
        (action.dismissAll || notification.key === action.key) ? {
          ...notification,
          dismissed: true,
        } : {
          ...notification,
        }
      )),
    }
  }
  if (action.type === SNACKBAR_REMOVE) {
    return {
      ...state,
      notifications: state.notifications.filter(n => n.key !== action.key),
    }
  }
  if (action.type === DRAWER_OPEN) {
    return {
      ...state,
      drawerOpen: true,
    }
  }
  if (action.type === DRAWER_CLOSE) {
    return {
      ...state,
      drawerOpen: false,
    }
  }
  if (action.type === MODAL_OPEN) {
    return {
      ...state,
      modalName: action.name,
      modalOpen: true,
      modalOptions: action.options,
    }
  }
  if (action.type === MODAL_CLOSE) {
    return {
      ...state,
      modalName: null,
      modalOpen: false,
      modalOptions: {},
    }
  }
  if (action.type === SET_BRIGHTNESS) {
    return {
      ...state,
      brightness: action.brightness,
    }
  }
  return state
}
