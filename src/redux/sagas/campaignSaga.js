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

function* campaignSaga() {
  yield takeEvery('FETCH_CAMPAIGNS', fetchCampaigns);
}

export default campaignSaga;