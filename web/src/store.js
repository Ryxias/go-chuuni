import createSagaMiddleware from 'redux-saga'
import {
  browserHistory,
} from 'react-router'
import {
  routerMiddleware,
} from 'react-router-redux'
import {
  applyMiddleware,
  compose,
  createStore,
} from 'redux'

import fetchMiddleware from 'middlewares/fetch'
import localStorageMiddleware from 'middlewares/localStorage'
import reducer from 'reducers'
import sagas from 'sagas'

const router = routerMiddleware(browserHistory)
const sagaMiddleware = createSagaMiddleware()
const enhancer = compose(applyMiddleware(
  fetchMiddleware,
  localStorageMiddleware,
  router,
  sagaMiddleware
))

export default function configureStore (initialState) {
  const store = createStore(
    reducer,
    initialState,
    enhancer
  )
  sagaMiddleware.run(sagas)
  return store
}
