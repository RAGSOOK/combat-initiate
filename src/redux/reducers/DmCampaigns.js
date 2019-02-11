const DMCampaigns = (state = [], action) => {
    switch (action.type) {
      case 'SET_DM_CAMPAIGNS':
        return action.payload;
      default:
        return state;
    }
  };

// loginMode will be on the redux state at:
// state.loginMode
  export default DMCampaigns;