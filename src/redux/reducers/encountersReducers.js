import { combineReducers } from 'redux';

const editEncounter = (state={}, action) => {
  switch (action.type) {
    case 'SET_EDIT_ENCOUNTER':
      return action.payload;
    default:
      return state;
  }
}

const myEncounters = (state=[], action) => {
  switch (action.type) {
    case 'SET_MY_ENCOUNTERS':
      return action.payload;
    default:
      return state;
  }
}

const sessionEncounters = (state=[], action) => {
  switch (action.type) {
    case 'SET_SESSION_ENCOUNTERS':
      return action.payload;
    case 'EMPTY_SESSION_ENCOUNTERS':
      return [];
    default:
      return state;
  }
}

  export default combineReducers({
    editEncounter,
    myEncounters,
    sessionEncounters,
  });