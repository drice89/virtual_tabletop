import { RECEIVE_GAMES, RECEIVE_GAME } from '../actions/games_actions';
import { RECEIVE_USER } from '../actions/users_actions';

export default (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_GAMES:
      return action.games;
    case RECEIVE_GAME:
      return { ...state, ...{ [action.payload.game._id]: action.payload.game } };
    case RECEIVE_USER:
      return { ...state, ...action.payload.games };
    default:
      return state;
  }
};
