import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';


function* fetchPlayers() {
  try {
    const response = yield axios.get(`api/players/${action.payload}`);

    yield put({ type: 'SET_CURRENT_PLAYERS', payload: response.data });

  } catch (error) {
    console.log('Player get request failed', error);
  }
}


function* playerSaga() {
  yield takeEvery('GET_CURRENT_PLAYERS', fetchPlayers);

}

export default playerSaga;