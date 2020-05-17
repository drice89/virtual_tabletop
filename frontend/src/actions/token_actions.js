import * as BoardAPIUtil from "../util/boards_api_util"

export const RECEIVE_TOKEN = 'RECEIVE_TOKEN';
export const DELETE_TOKEN = 'DELETE_TOKEN';
export const RECEIVE_TOKEN_ERRORS = 'RECEIVE_TOKEN_ERRORS';



export const receiveToken = (token) => ({
  type: RECEIVE_TOKEN,
  token,
});

export const deleteToken = (tokenId) => ({
  type: DELETE_TOKEN,
  tokenId,
});

export const receiveTokenErrors = (errors) => ({
  type: RECEIVE_TOKEN_ERRORS,
  errors,
});


//thunk for tokens
export const createToken = token => dispatch => (
  BoardAPIUtil.createToken(token)
  .then(() => dispatch(receiveToken(token)))
  .catch(() => console.log("NOOO"))

)