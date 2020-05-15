import * as BoardAPIUtil from '../util/boards_api_util';


export const RECEIVE_BOARD = 'RECEIVE_BOARD';
export const DELETE_BOARD = 'DELETE_BOARD';
export const RECEIVE_BOARD_ERRORS = 'RECEIVE_BOARD_ERRORS';

export const receiveBoard = (board) => ({
  type: RECEIVE_BOARD,
  board,
});

export const deleteBoard = (boardId) => ({
  type: DELETE_BOARD,
  boardId,
});

export const receiveBoardErrors = (errors) => ({
  type: RECEIVE_BOARD_ERRORS,
  errors,
});


export const fetchBoard = (boardId) => (dispatch) => (
  BoardAPIUtil.fetchBoard(boardId)
    .then((board) => dispatch(receiveBoard(board.data)))
    .catch((err) => dispatch(receiveBoardErrors(err.response.data)))
);
