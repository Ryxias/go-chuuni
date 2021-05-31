/* global fetch */

export const CALL_FETCH = Symbol('CALL_FETCH')

export async function makeFetchCall (endpoint, data = {}, method = 'GET', headers = {}) {
  try {
    const options = {
      headers: {
        'Accept': 'application/json', // eslint-disable-line quote-props
        'Content-Type': 'application/json',
        ...headers,
      },
      method,
    }
    if (method === 'POST' || method === 'PUT' || method === 'PATCH') {
      options.body = JSON.stringify(data)
    }
    const response = await fetch(endpoint, options)
    const json = await response.json()
    if (!response.ok) {
      throw new Error(json.message)
    }
    return json
  } catch (e) {
    console.log('Error caught in `middlewares/fetch` -- ', e.message, { method }) // eslint-disable-line no-console
    throw new Error(e.message)
  }
}

export function actionWith (action, dat, form, other) {
  const finalAction = {
    ...action,
    ...dat,
    form,
    other,
  }
  delete finalAction[CALL_FETCH]
  return finalAction
}

export default store => next => async action => {
  const callFetch = action[CALL_FETCH]
  if (typeof callFetch === 'undefined') {
    return next(action)
  }
  const {
    method,
    types,
    data,
    form,
    other,
    headers,
    endpoint,
  } = callFetch
  const [
    REQUEST,
    SUCCESS,
    FAILURE,
  ] = types
  next(actionWith(action, { type: REQUEST }, form))
  return makeFetchCall(endpoint, data, method, headers).then(
    response => next(actionWith(action, {
      response,
      type: SUCCESS,
    }, form, other)),
    e => next(actionWith(action, {
      type: FAILURE,
      error: e.message || e.error,
    }, form, other))
  )
}
