import { all } from 'redux-saga/effects';
import loginSaga from './loginSaga';
import registrationSaga from './registrationSaga';
import userSaga from './userSaga';
import campaignSaga from './campaignSaga.js';
import playerSaga from './playerSaga.js';
import characterSaga from './characterSaga.js';
import encounterSaga from './encounterSaga.js';
import monsterSaga from './monsterSaga.js';

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(),
    registrationSaga(),
    userSaga(),
    campaignSaga(),
    playerSaga(),
    characterSaga(),
    encounterSaga(),
    monsterSaga(),
  ]);
}
