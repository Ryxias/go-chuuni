import {
  routerReducer,
} from 'react-router-redux'
import {
  combineReducers,
} from 'redux'
import {
  reducer as formReducer,
} from 'redux-form'

import loadingReducer from 'reducers/loading'
import uiReducer from 'reducers/ui'
import serviceStatusReducer from 'reducers/servicestatus'

export const reducerList = {
  form: formReducer,
  routing: routerReducer,
  loading: loadingReducer,
  ui: uiReducer,
  servicestatus: serviceStatusReducer,
}

export default combineReducers(reducerList)
