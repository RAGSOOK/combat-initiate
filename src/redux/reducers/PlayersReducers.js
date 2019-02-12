import { combineReducers } from 'redux';

const CurrentPlayers = (state=[], action) => {
  switch (action.type) {
    case 'SET_CURRENT_PLAYERS':
      return action.payload;
    default:
      return state;
  }
}

  export default combineReducers({
    CurrentPlayers,
  });