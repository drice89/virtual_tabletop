import { RECEIVE_GAME } from '../actions/games_actions';
import { DELETE_BOARD, RECEIVE_BOARD } from '../actions/board_actions';
import { RECEIVE_TOKEN, DELETE_TOKEN } from '../actions/token_actions';

export default (state = {}, action) => {
  Object.freeze(state);
  const nextState = { ...state };
  switch (action.type) {
    case RECEIVE_BOARD:
      action.board.tokens.forEach((token) => {
        nextState[token._id] = token;
      });
      return nextState;
    case RECEIVE_GAME:
      // debugger
      Object.values(action.payload.boards).forEach((board) => {
        board.tokens.forEach((token) => {
          nextState[token._id] = token;
        });
      });
      return nextState;
    case RECEIVE_TOKEN:
      return { ...state, ...{ [action.token._id]: action.token } };
    case DELETE_TOKEN:
      delete nextState[action.tokenId];
      return nextState;
    default:
      return state;
  }
};
