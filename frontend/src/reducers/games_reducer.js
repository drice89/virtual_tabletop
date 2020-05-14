import { RECEIVE_GAMES, RECEIVE_GAME } from '../actions/games_actions';

export default (state = {}, action) => {
  Object.freeze(state);
  debugger

  switch (action.type) {
    case RECEIVE_GAMES:
      return action.games;
    default:
      return state;
  }
};
