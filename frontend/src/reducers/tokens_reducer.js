import { RECEIVE_GAME } from '../actions/games_actions';
import { DELETE_BOARD } from '../actions/board_actions';
import { RECEIVE_TOKEN, DELETE_TOKEN } from '../actions/token_actions';

export default (state = {}, action) => {
  Object.freeze(state);
  const nextState = { ...state };
  switch (action.type) {
    case RECEIVE_GAME:
      return action.payload.tokens;
    case RECEIVE_TOKEN:
      return { ...state, ...{ [action.token.id]: action.token } };
    case DELETE_BOARD:
      return {};
    case DELETE_TOKEN:
      delete nextState[action.tokenId];
      return nextState;
    default:
      return state;
  }
};