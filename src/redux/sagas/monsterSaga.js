import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';


function* fetchMonsters() {
  try {
    const response = yield axios.get(`api/monster`);

    yield put({ type: 'SET_MY_MONSTERS', payload: response.data });
  } catch (error) {
    console.log('Monster get request failed', error);
  }
}

function* createMonster(action) {
  try{
    yield axios.post('api/monster', action.payload);

    const nextAction = { type: 'FETCH_MONSTERS' };
    yield put(nextAction);
  } catch (error) {
      console.log('There is error in POST Monster', error);
  }
}

function* editMonster(action){
  try{
    yield axios.put(`api/monster/${action.payload.id}`, action.payload);

    const nextAction = { type: 'FETCH_MONSTERS' };
    yield put(nextAction);
  }catch (error){
    console.log('There is error in PUT Edit Monster', error);
  }
}

function* deleteMonster(action){
  try{
    yield axios.delete(`api/monster/${action.payload.id}`);

    const nextAction = { type: 'FETCH_MONSTERS' };
    yield put(nextAction);
  }catch(error){
    console.log('Error in Monster Delete', error);
  }
}

function* sessionMonsters(action){
  try{
    const response = yield axios.get(`api/monster/${action.payload.id}`);

    const nextAction = { type: 'SET_SESSION_MONSTERS', payload: response.data };
    yield put(nextAction);
  }catch(error){
    console.log('Error in Fetch Session Monsters', error);
  }
}

function* monsterSaga() {
  yield takeEvery('FETCH_MONSTERS', fetchMonsters);
  yield takeEvery('CREATE_MONSTER', createMonster);
  yield takeEvery('EDIT_MONSTER', editMonster);
  yield takeEvery('DELETE_MONSTER', deleteMonster);
  yield takeEvery('FETCH_SESSION_MONSTERS', sessionMonsters);
}

export default monsterSaga;