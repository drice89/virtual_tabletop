import * as UsersAPIUtil from '../util/users_api_util';

export const RECEIVE_USER = 'RECEIVE_USER';
export const RECEIVE_USER_INFO = 'RECEIVE_USER_INFO';
export const RECEIVE_USER_ERRORS = 'RECEIVE_USER_ERRORS';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';


export const RECEIVE_PIECE = 'RECEIVE_PIECE';
export const RECEIVE_PIECES = 'RECEIVE_PIECES';
export const REMOVE_PIECE = 'REMOVE_PIECE_PIECE';

export const receiveUser = (payload) => ({
  type: RECEIVE_USER,
  payload,
});

export const receiveUserInfo = (user) => ({
  type: RECEIVE_USER_INFO,
  user,
});



const receiveErrors = (errors) => ({
  type: RECEIVE_USER_ERRORS,
  errors,
});

export const fetchUser = (userId) => (dispatch) => (
  UsersAPIUtil.fetchUserInfo(userId)
    .then((user) => dispatch(receiveUserInfo(user.data)))
    .catch((err) => dispatch(receiveErrors(err)))
);

export const fetchUserGames = (userId) => (dispatch) => (
  UsersAPIUtil.fetchUser(userId)
    .then((payload) => dispatch(receiveUser(payload.data)))
    .catch((err) => dispatch(receiveErrors(err)))
);



//piece action

const receivePieces = (pieces) => ({
  type: RECEIVE_PIECES,
  pieces,
});
const receivePiece = (piece) => ({
  type: RECEIVE_PIECE,
  piece,
});
const removePiece = (pieceId) => ({
  type: REMOVE_PIECE,
  pieceId,
});






//pieces thunk actions

//payload contains = {userId, pieceId}
export const fetchPieces = (userId) => (dispatch) => (
  UsersAPIUtil.fetchPieces(userId)
    .then((pieces) => dispatch(receivePieces(pieces.data)))
);
export const createPiece = (payload) => (dispatch) => (
  UsersAPIUtil.createPiece(payload)
    .then((piece) => dispatch(receivePiece(piece.data)))
);
export const deletePiece = (payload) => (dispatch) => (
  UsersAPIUtil.deletePiece(payload)
    .then(() => dispatch(removePiece(payload.pieceId)))
);
