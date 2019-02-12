const PCCampaigns = (state = [], action) => {
    switch (action.type) {
      case 'SET_PC_CAMPAIGNS':
        return action.payload;
      default:
        return state;
    }
  };
  
  export default PCCampaigns;