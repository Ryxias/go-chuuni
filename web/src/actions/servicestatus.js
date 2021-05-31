import {
  CALL_FETCH,
} from 'middlewares/fetch'
import {
  SERVICE_STATUS_REQUEST,
  SERVICE_STATUS_SUCCESS,
  SERVICE_STATUS_FAILURE,
} from 'constants/servicestatus'

export const fetchServiceStatus = (resolve, reject) => ({
  [CALL_FETCH]: {
    method: 'GET',
    endpoint: '/_api/health',
    headers: {
      // We do not send any sort of Authorization header through the react app.
      // We rely on the browser's installed Endpoint Verification to send up the necessary headers to Google IAP
      // to perform proper authorization.
      //
      // When such results in a request that can't be authenticated, IAP will redirect the user to the
      // google sign-in page and prompt for login.
    },
    types: [
      SERVICE_STATUS_REQUEST,
      SERVICE_STATUS_SUCCESS,
      SERVICE_STATUS_FAILURE,
    ],
    form: {
      resolve,
      reject,
    },
  },
})
