import * as localStorageService from 'services/localStorage'

export const CALL_LOCAL_STORAGE = Symbol('CALL_LOCAL_STORAGE')

export async function makeLocalStorageCall (
  method,
  data = {},
) {
  try {
    const result = await localStorageService[method](data)
    return result
  } catch (e) {
    console.log('Error caught in `middleware/localStorage` -- ', e.message, { method: data })
    throw new Error(e.message)
  }
}

export function actionWith (
  action,
  dat,
  form,
  extra,
) {
  const finalAction = {
    ...action,
    ...dat,
    form,
    extra,
  }
  delete finalAction[CALL_LOCAL_STORAGE]
  return finalAction
}

export default (store) => (next) => async (action) => {
  const callLocalStorage = action[CALL_LOCAL_STORAGE]
  if (typeof callLocalStorage === 'undefined') {
    return next(action)
  }
  const {
    method,
    types,
    data,
    form,
    extra,
  } = callLocalStorage
  const [
    REQUEST,
    SUCCESS,
    FAILURE,
  ] = types
  next(actionWith(action, { type: REQUEST }, form, extra))
  return makeLocalStorageCall(
    method,
    data,
  ).then(
    response => next(actionWith(action, {
      response,
      type: SUCCESS,
    }, form, extra)),
    e => next(actionWith(action, {
      type: FAILURE,
      error: e.message || e.error,
    }, form, extra)),
  )
}
