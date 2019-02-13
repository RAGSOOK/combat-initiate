import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';


function* fetchCharacters(action) {
  try {
    const response = yield axios.get(`api/character`);

    yield put({ type: 'SET_PLAYER_CHARACTERS', payload: response.data });

  } catch (error) {
    console.log('CHaracter get request failed', error);
  }
}

function* addCharacter(action) {
  try{
    yield axios.post(`api/character`, action.payload);

  }catch (error){
    console.log('error in add character saga', error);
  }
}

function* editCharacter(action){
  try{
    yield axios.put(`api/character/${action.payload.charId}`, action.payload);

    const nextAction = { type: 'FETCH_CHARACTERS' };
    yield put(nextAction);
  }catch (error){
    console.log('There is error in PUT Edit Character', error);
  }
}

function* characterSaga() {
  yield takeEvery('FETCH_CHARACTERS', fetchCharacters);
  yield takeEvery('CREATE_CHARACTER', addCharacter);
  yield takeEvery('EDIT_CHARACTER', editCharacter);
}

export default characterSaga;