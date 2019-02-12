import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchCampaigns() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    const responseDm = yield axios.get('api/campaign/dm', config);
    const responsePc = yield axios.get('api/campaign/pc', config);

    yield put({ type: 'SET_DM_CAMPAIGNS', payload: responseDm.data });
    yield put({ type: 'SET_PC_CAMPAIGNS', payload: responsePc.data });
  } catch (error) {
    console.log('Campaign get request failed', error);
  }
}

function* createCampaign(action) {
  try{
    yield axios.post('api/campaign', action.payload);

    const nextAction = { type: 'FETCH_CAMPAIGNS' };
    yield put(nextAction);
  } catch (error) {
      console.log('There is error in POST Campaign', error);
  }
}

function* addPlayersToCampaign(action){
  try{
    yield
  }catch (error){
    console.log('There is error in POST Add players to Campaign', error);
  }
}

function* deleteCampaign(action){
  try{
    yield axios.delete(`api/campaign/${action.payload.id}`);

    const nextAction = { type: 'FETCH_CAMPAIGNS' };
    yield put(nextAction);
  }catch(error){
    console.log('Error in campaign Delete', error);
  }
}

function* leaveCampaign(action){
  try{
    console.log('in leave campaign with id:',action.payload);
    yield axios.delete(`api/campaign/player/${action.payload}`);

    const nextAction = { type: 'FETCH_CAMPAIGNS' };
    yield put(nextAction);
  }catch(error){
    console.log('Error in campaign Leave', error);
  }
}

function* campaignSaga() {
  yield takeEvery('FETCH_CAMPAIGNS', fetchCampaigns);
  yield takeEvery('CREATE_CAMPAIGN', createCampaign);
  yield takeEvery('ADD_PLAYERS_TO_CAMPAIGN', addPlayersToCampaign);
  yield takeEvery('DELETE_CAMPAIGN', deleteCampaign);
  yield takeEvery('LEAVE_CAMPAIGN', leaveCampaign);
}

export default campaignSaga;