import { RECEIVE_GAMES, RECEIVE_GAME } from '../actions/games_actions';

export default (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_GAMES:
      return action.games;
    case RECEIVE_GAME:
      return { ...state, ...{ [action.game.id]: action.game } };
    default:
      return state;
  }
};
