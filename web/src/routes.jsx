import React from 'react'
import {
  Route,
  Redirect,
  IndexRedirect,
} from 'react-router'

import App from 'pages/App'
import Home from 'pages/Home'
import ServiceStatus from 'pages/ServiceStatus'
import {
  LANDING_PAGE,
  SERVICE_STATUS_PAGE,
} from 'constants/navigation'
import { ensureStoreParams } from 'couriers/ui'
import { ensureServiceStatus } from 'couriers/servicestatus'
import { composeEnterHooksSeries } from 'utils/routes'

export default function routes (store) {
  return (
    <Route
        path="/"
        component={App}
      >
      <Route
          path={LANDING_PAGE}
          component={Home}
          title="Chuuni.me"
          onEnter={composeEnterHooksSeries(
            ensureStoreParams(store),
            // ensureAuthToken(store),
          )}
      />
      <Route
          path={SERVICE_STATUS_PAGE}
          component={ServiceStatus}
          title="Status"
          onEnter={composeEnterHooksSeries(
            ensureStoreParams(store),
            ensureServiceStatus(store),
          )}
      />

      <Redirect
          from="*"
          to={LANDING_PAGE}
      />
      <IndexRedirect to={LANDING_PAGE} />
    </Route>
  )
}
