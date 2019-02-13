import { combineReducers } from 'redux';

const playerCharacters = (state=[], action) => {
  switch (action.type) {
    case 'SET_PLAYER_CHARACTERS':
      return action.payload;
    default:
      return state;
  }
}

const editCharacter = (state={}, action) => {
  switch (action.type) {
    case 'SET_EDIT_CHARACTER':
      return action.payload;
    default:
      return state;
  }
}

  export default combineReducers({
    playerCharacters,
    editCharacter,
  });