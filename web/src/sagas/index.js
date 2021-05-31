import {
  all,
} from 'redux-saga/effects'

// import {
//   loadAnnouncementsFailure,
//   loadAnnouncementFailure,
//   createAnnouncementJiraSuccess,
//   createAnnouncementJiraFailure,
// } from 'sagas/response'
import {
  setBrightness,
} from 'sagas/ui'
// import {
//   chartTypeChange,
// } from 'sagas/csirtMetrics'
// import {
//   createCaseFailure,
//   createCaseSuccess,
//   addCaseNoteSuccess,
//   addCaseNoteFailure,
//   closeCaseSuccess,
//   closeCaseFailure,
//   saveOnCallSummarySuccess,
// } from 'sagas/csirt'
// import {
//   setAuthTokenSuccess,
// } from 'sagas/session'

export default function * rootSaga () {
  yield all([
    // ...[ // RESPONSE
    //   loadAnnouncementsFailure(),
    //   loadAnnouncementFailure(),
    //   createAnnouncementJiraSuccess(),
    //   createAnnouncementJiraFailure(),
    // ],
    ...[ // UI
      setBrightness(),
    ],
    // ...[ // CSIRT METRICS
    //   chartTypeChange(),
    // ],
    // ...[ // CSIRT
    //   createCaseFailure(),
    //   createCaseSuccess(),
    //   addCaseNoteSuccess(),
    //   addCaseNoteFailure(),
    //   closeCaseSuccess(),
    //   closeCaseFailure(),
    //   saveOnCallSummarySuccess(),
    // ],
    // ...[ // SESSION
    //   setAuthTokenSuccess(),
    // ],
  ])
}
