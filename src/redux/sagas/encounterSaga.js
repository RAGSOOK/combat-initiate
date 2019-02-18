import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';


function* fetchEncounters() {
  try {
    const response = yield axios.get(`api/encounter`);

    yield put({ type: 'SET_MY_ENCOUNTERS', payload: response.data });
  } catch (error) {
    console.log('Encounter get request failed', error);
  }
}

function* createEncounter(action) {
  try{
    yield axios.post('api/encounter', action.payload);

    const nextAction = { type: 'FETCH_ENCOUNTERS' };
    yield put(nextAction);
  } catch (error) {
      console.log('There is error in POST Encounter', error);
  }
}

function* editEncounter(action){
  try{
    yield axios.put(`api/encounter/${action.payload.id}`, action.payload);

    const nextAction = { type: 'FETCH_ENCOUNTERS' };
    yield put(nextAction);
  }catch (error){
    console.log('There is error in PUT Edit Encounter', error);
  }
}

function* deleteEncounter(action){
  try{
    yield axios.delete(`api/encounter/${action.payload.id}`);

    const nextAction = { type: 'FETCH_ENCOUNTERS' };
    yield put(nextAction);
  }catch(error){
    console.log('Error in encounter Delete', error);
  }
}

function* encounterSaga() {
  yield takeEvery('FETCH_ENCOUNTERS', fetchEncounters);
  yield takeEvery('CREATE_ENCOUNTER', createEncounter);
  yield takeEvery('EDIT_ENCOUNTER', editEncounter);
  yield takeEvery('DELETE_ENCOUNTER', deleteEncounter);
}

export default encounterSaga;