import {
  REMOVE_PIECE,
  RECEIVE_PIECE,
  RECEIVE_PIECES,
} from '../actions/pieces_action';
import { RECEIVE_USER, RECEIVE_USER_INFO } from '../actions/users_actions';

export default (state = {}, action) => {
  Object.freeze(state);
  let nextState = Object.assign({}, state)
  switch (action.type) {
    case RECEIVE_PIECES:
      return action.pieces;
    case RECEIVE_PIECE:
      nextState[action.piece._id] = action.piece
      return nextState;
    case REMOVE_PIECE:
      delete nextState[action.pieceId];
      return nextState;
    case RECEIVE_USER:
      return action.payload.pieces;
    case RECEIVE_USER_INFO:
      action.user.pieces.forEach(piece => {
        nextState[piece._id] = piece;
      })
      return nextState;
    default:
      return state;
}
};
