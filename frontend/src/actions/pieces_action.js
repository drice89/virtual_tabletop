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

const removePiece = (pieceId) => ({
  type: REMOVE_PIECE,
  pieceId,
});

export const createPiece = (formData) => (dispatch) => (
  PieceUtil.createPiece(formData)
    .then((piece) => dispatch(receivePiece(piece.data)))
    .catch((error) => dispatch(receiveErrors(error.response.data)))
);

export const deletePiece = (payload) => (dispatch) => (
  PieceUtil.deletePiece(payload)
    .then((pieceId) => dispatch(removePiece(pieceId)))
    .catch((err) => console.log(err))
);
