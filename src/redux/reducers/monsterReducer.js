import { combineReducers } from 'redux';

const editMonster = (state={}, action) => {
  switch (action.type) {
    case 'SET_EDIT_MONSTER':
      return action.payload;
    default:
      return state;
  }
}

const myMonsters = (state=[], action) => {
  switch (action.type) {
    case 'SET_MY_MONSTERS':
      return action.payload;
    default:
      return state;
  }
}

const sessionMonsters = (state=[], action) => {
  switch (action.type) {
    case 'SET_SESSION_MONSTERS':
      return action.payload;
    default:
      return state;
  }
}

const setEditingMonsters = (state=[], action) => {
  switch(action.type){
    case 'SET_EDITING_MONSTERS':
      return action.payload;
    default:
      return state;
  }
}

  export default combineReducers({
    editMonster,
    myMonsters,
    sessionMonsters,
    setEditingMonsters,
  });