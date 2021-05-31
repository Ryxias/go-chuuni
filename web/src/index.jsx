import React from 'react'
import ReactDOM from 'react-dom'
import {
  syncHistoryWithStore,
} from 'react-router-redux'
import {
  Router,
  browserHistory,
} from 'react-router'
import {
  Provider,
} from 'react-redux'

import Session from 'containers/Session'
import configureStore from 'store'
import routes from 'routes'

const store = configureStore({
})
const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
  <Provider {...{ store }}>
    <Session>
      <Router {...{ history }}>
        {routes(store)}
      </Router>
    </Session>
  </Provider>
  , document.getElementById('js-app')
)
