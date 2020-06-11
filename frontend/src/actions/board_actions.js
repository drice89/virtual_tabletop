import * as BoardAPIUtil from '../util/boards_api_util';
export const RECEIVE_BOARD = 'RECEIVE_BOARD';
export const DELETE_BOARD = 'DELETE_BOARD';
export const RECEIVE_BOARD_ERRORS = 'RECEIVE_BOARD_ERRORS';


export const receiveBoard = (board) => ({
  type: RECEIVE_BOARD,
  board,
});

export const deleteBoard = (board) => ({
  type: DELETE_BOARD,
  board,
});

export const receiveBoardErrors = (errors) => ({
  type: RECEIVE_BOARD_ERRORS,
  errors,
});


export const createBoard = board => dispatch => (
  BoardAPIUtil.createBoard(board)
    .then(() => dispatch(receiveBoard(board)))

)
export const fetchBoard = (boardId) => (dispatch) => (
  BoardAPIUtil.fetchBoard(boardId)
    .then((board) => dispatch(receiveBoard(board.data)))
    .catch((err) => dispatch(receiveBoardErrors(err.response.data)))
);
