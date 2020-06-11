import { RECEIVE_PIECE_ERRORS, RECEIVE_PIECE } from '../actions/pieces_action';

const piecesErrorsReducer = (state = [], action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_PIECE_ERRORS:
      return action.errors;
    case RECEIVE_PIECE:
      return [];
    default:
      return state;
  }
};

export default piecesErrorsReducer;
