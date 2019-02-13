import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';


function* fetchCharacters(action) {
  try {
      console.log('in fetch charactrer saga');
    const response = yield axios.get(`api/character`);

    yield put({ type: 'SET_PLAYER_CHARACTERS', payload: response.data });

  } catch (error) {
    console.log('CHaracter get request failed', error);
  }
}


function* characterSaga() {
  yield takeEvery('FETCH_CHARACTERS', fetchCharacters);

}

export default characterSaga;