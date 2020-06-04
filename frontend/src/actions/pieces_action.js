import * as PieceUtil from "../util/piece_api_util";

export const RECEIVE_PIECE = 'RECEIVE_PIECE';
export const RECEIVE_PIECES = 'RECEIVE_PIECES';
export const REMOVE_PIECE = 'REMOVE_PIECE';
export const RECEIVE_PIECE_ERRORS = 'RECEIVE_PIECE_ERRORS';

const receivePiece = (piece) => ({
  type: RECEIVE_PIECE,
  piece,
});

const receiveErrors = (errors) => ({
  type: RECEIVE_PIECE_ERRORS,
  errors,
});


export const createPiece = (formData) => (dispatch) => (
  PieceUtil.createPiece(formData)
    .then((piece) => dispatch(receivePiece(piece.data)))
    .catch((error) => dispatch(receiveErrors(error.response.data)))
);
