import {
  takeEvery,
  put,
} from 'redux-saga/effects'

import {
  SET_BRIGHTNESS,
} from 'constants/ui'
import {
  saveTheme,
} from 'actions/ui'

export function * setBrightnessEffect (action) {
  yield put(saveTheme(action.brightness))
}

export function * setBrightness () {
  yield takeEvery(
    SET_BRIGHTNESS,
    setBrightnessEffect,
  )
}
