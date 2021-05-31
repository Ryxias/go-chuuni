import {
  SERVICE_STATUS_REQUEST,
  SERVICE_STATUS_SUCCESS,
  SERVICE_STATUS_FAILURE,
} from 'constants/servicestatus'

export const loadingTypes = {
  fetchServiceStatus: {
    [SERVICE_STATUS_REQUEST]: true,
    [SERVICE_STATUS_SUCCESS]: false,
    [SERVICE_STATUS_FAILURE]: false,
  },

}

export const getDefaultState = () => Object.keys(loadingTypes).reduce((p, c) => ({
  ...p,
  [c]: false,
}), {})

export default (state = getDefaultState(), action) => {
  // this is used to show loading indicators, keeps track of what's loading
  // *_REQUEST will toggle on and *_SUCCESS/*_FAILURE will toggle off
  const loadingTypesKeys = Object.keys(loadingTypes)
  for (let index = 0; index < loadingTypesKeys.length; index++) {
    const loadingPropName = loadingTypesKeys[index]
    const loadingType = loadingTypes[loadingPropName]
    if (loadingType[action.type] !== undefined) {
      return {
        ...state,
        [loadingPropName]: loadingType[action.type],
      }
    }
  }
  return state
}
