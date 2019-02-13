import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';


function* fetchPlayers(action) {
  try {
      console.log('in fetch player saga with ', action.payload);
    const response = yield axios.get(`api/player/${action.payload}`);

    yield put({ type: 'SET_CURRENT_PLAYERS', payload: response.data });

  } catch (error) {
    console.log('Player get request failed', error);
  }
}


function* playerSaga() {
  yield takeEvery('GET_CURRENT_PLAYERS', fetchPlayers);

}

export default playerSaga;