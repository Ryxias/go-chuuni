import {
  createSelector,
} from 'reselect'

export const getLoadingState = state => state.loading

export const getInProgress = createSelector(
  [
    getLoadingState,
  ], loadingState => Object.keys(loadingState).reduce((p, c) => (p || loadingState[c]), false),
)
