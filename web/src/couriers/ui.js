import {
  storeParams,
} from 'actions/ui'

export const ensureStoreParams = store => async (nextState, replace, next) => {
  store.dispatch(storeParams(nextState.params))
  next()
}
