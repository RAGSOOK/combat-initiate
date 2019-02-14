import { combineReducers } from 'redux';

const EditCampaign = (state={}, action) => {
  switch (action.type) {
    case 'SET_EDIT_CAMPAIGN':
      return action.payload;
    default:
      return state;
  }
}

const DMCampaigns = (state = [], action) => {
    switch (action.type) {
      case 'SET_DM_CAMPAIGNS':
        return action.payload;
      default:
        return state;
    }
  };


  ////////////////////////////////
  ///This may be better somewhere else///
  ////////////////////////////////
const joinSessionDM = (state = {}, action) => {
  switch(action.type) {
    case 'SET_SESSION_CAMPAIGN':
      return action.payload;
    default:
      return state;
  }
}

// loginMode will be on the redux state at:
// state.loginMode
  export default combineReducers({
    DMCampaigns,
    EditCampaign,
    joinSessionDM,
  });