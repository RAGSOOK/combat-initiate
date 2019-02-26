import {CurrentPlayers} from '../redux/reducers/PlayersReducers';

test('players reducers should initially be an empty array', () => {
    const action = {};
    const returnedState = CurrentPlayers(undefined, action);
    expect(Array.isArray(returnedState)).toBe(true);
    expect(returnedState.length).toBe(0);
  });

test('should return sent array on SET_CURRENT_PLAYERS', () => {
    const action = {type: 'SET_CURRENT_PLAYERS',
                    payload: ['Test1','Test2']};

    const returnedState = CurrentPlayers(undefined, action);
    expect(returnedState).toEqual(['Test1','Test2']);
});

test('should ignore uninteresting types', () => {
    const action = {type: 'IGNORE_ME',
                    payload: ['Test1','Test2']};

    const returnedState = CurrentPlayers(undefined, action);
    expect(returnedState).toEqual([]);
});