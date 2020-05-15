import { RECEIVE_GAME } from '../actions/games_actions';
import { RECEIVE_BOARD, DELETE_BOARD } from '../actions/board_actions';

export default (state = {}, action) => {
  Object.freeze(state);
  const nextState = { ...state };
  switch (action.type) {
    // case RECEIVE_GAME:
    //   return action.boards;
    case RECEIVE_BOARD:
      return { ...state, ...{ [action.game.id]: action.game } };
    case DELETE_BOARD:
      delete nextState[action.boardId];
      return nextState;
    default:
      return state;
  }
};
