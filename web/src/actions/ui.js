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
  LOAD_THEME_REQUEST,
  LOAD_THEME_SUCCESS,
  LOAD_THEME_FAILURE,
  SAVE_THEME_REQUEST,
  SAVE_THEME_SUCCESS,
  SAVE_THEME_FAILURE,
} from 'constants/ui'
import {
  CALL_LOCAL_STORAGE,
} from 'middlewares/localStorage'

export const openModal = (name, options = {}) => ({
  type: MODAL_OPEN,
  name,
  options,
})

export const closeModal = () => ({
  type: MODAL_CLOSE,
})

export const openDrawer = () => ({
  type: DRAWER_OPEN,
})

export const closeDrawer = () => ({
  type: DRAWER_CLOSE,
})

export const enqueueSnackbar = (notification) => {
  const key = notification.options && notification.options.key
  return {
    type: SNACKBAR_ENQUEUE,
    notification: {
      ...notification,
      key: key || new Date().getTime() + Math.random()
    }
  }
}

export const closeSnackbar = key => ({
  type: SNACKBAR_CLOSE,
  dismissAll: !key,
  key,
})

export const removeSnackbar = key => ({
  type: SNACKBAR_REMOVE,
  key,
})

export const storeParams = params => ({
  type: STORE_PARAMS,
  params,
})

export const setBrightness = brightness => ({
  type: SET_BRIGHTNESS,
  brightness,
})

export const loadTheme = () => ({
  [CALL_LOCAL_STORAGE]: {
    method: 'loadTheme',
    types: [
      LOAD_THEME_REQUEST,
      LOAD_THEME_SUCCESS,
      LOAD_THEME_FAILURE,
    ],
  },
})

export const saveTheme = (brightness) => ({
  [CALL_LOCAL_STORAGE]: {
    method: 'saveTheme',
    data: {
      theme: brightness,
    },
    types: [
      SAVE_THEME_REQUEST,
      SAVE_THEME_SUCCESS,
      SAVE_THEME_FAILURE,
    ],
  },
})
