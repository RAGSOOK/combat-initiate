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

function* fetchCampaignEncounters(action) {
  try {
    const response = yield axios.get(`api/encounter/${action.payload}`);

    yield put({ type: 'SET_SESSION_ENCOUNTERS', payload: response.data });
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
    yield axios.put(`api/encounter/${action.payload.encId}`, action.payload);

    const Action = { type: 'FETCH_ENCOUNTERS' };
    yield put(Action);
  }catch (error){
    console.log('There is error in PUT Edit Encounter', error);
  }
}

function* editMonstersFromEncounter(action){
  try{
    const responseMons = yield axios.get(`api/monster/${action.payload.id}`);

    const monsAction = { type: 'SET_EDITING_MONSTERS', payload: responseMons.data };
    yield put(monsAction);
  }catch (error){
    console.log('There is error in GET Edit Encounter monsters', error);
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
  yield takeEvery('FETCH_CAMPAIGN_ENCOUNTERS', fetchCampaignEncounters);
  yield takeEvery('EDIT_ENCOUNTER_MONSTERS', editMonstersFromEncounter);
}

export default encounterSaga;