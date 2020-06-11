import { RECEIVE_GAMES, RECEIVE_GAME, EDIT_GAME, DELETE_GAME } from '../actions/games_actions';
import {
  RECEIVE_USER,
} from '../actions/users_actions';
import { RECEIVE_BOARD, DELETE_BOARD } from '../actions/board_actions';

export default (state = {}, action) => {
  Object.freeze(state);
  const nextState = { ...state };
  switch (action.type) {
    case RECEIVE_GAMES:
      return action.games;
    case RECEIVE_GAME:
      return { ...state, ...{ [action.payload.game._id]: action.payload.game } };
    case EDIT_GAME:
      return { ...state, ...{ [action.payload.game._id]: action.payload.game } };
    case DELETE_GAME:
      delete nextState[action.game._id];
      return nextState;
    case RECEIVE_BOARD:
      if (!nextState[action.board.gameId].boards.includes(action.board._id)){
        nextState[action.board.gameId].boards.push(action.board._id);
      }
      return nextState;
    case DELETE_BOARD:
      const idx = nextState[action.board.gameId].boards.indexOf(action.board._id);
      nextState[action.board.gameId].boards.splice(idx, 1);
      return nextState;
    case RECEIVE_USER:
      return { ...state, ...action.payload.games };
    default:
      return state;
  }
};
