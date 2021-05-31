import {
  createSelector,
} from 'reselect'

export const getServiceStatus = state => state.servicestatus

export const getServiceStatusMessage = createSelector(
  [
    getServiceStatus,
  ],
  state => state.message
)

export const getWhoami = createSelector(
  [
    getServiceStatus,
  ],
  state => state.whoami
)
