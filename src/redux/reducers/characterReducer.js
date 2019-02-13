import { combineReducers } from 'redux';

const playerCharacters = (state=[], action) => {
  switch (action.type) {
    case 'SET_PLAYER_CHARACTERS':
      return action.payload;
    default:
      return state;
  }
}

  export default combineReducers({
    playerCharacters,
  });