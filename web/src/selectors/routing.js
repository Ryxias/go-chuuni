import {
  createSelector,
} from 'reselect'

export const getRoutingState = state => state.routing

export const getParamsLocation = (state, ownProps) => ownProps.location

export const getLocationBeforeTransitions = createSelector(
  [
    getRoutingState,
  ],
  routingState => routingState.locationBeforeTransitions
)

export const getParamsQuery = createSelector(
  [
    getParamsLocation,
  ],
  paramsLocation => paramsLocation.query
)

export const getCurrentPath = () => window.location.pathname.split('/').slice(1)
