import {
  fetchServiceStatus,
} from 'actions/servicestatus'

export const ensureServiceStatus = store => async (nextState, replace, next) => {
  await store.dispatch(fetchServiceStatus())
  next()
}
