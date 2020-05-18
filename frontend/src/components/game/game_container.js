import { connect } from 'react-redux';
import Game from './game';
import { receiveBoard, fetchBoard, createBoard } from '../../actions/board_actions';

import {fetchPieces, createPiece, deletePiece} from "../../actions/users_actions"

import {createToken} from "../../actions/token_actions"

const mapStateToProps = (state, ownProps) => ({
  board: state.entities.boards[ownProps.match.params.boardId],
  pieces: state.entities.pieces,
  userId: state.session.userId,
  tokens: Object.values(state.entities.tokens)

});
const mapDispatchToProps = (dispatch) => ({
  createBoard: (board) => dispatch(createBoard(board)),
  receiveBoard: (board) => dispatch(receiveBoard(board)),
  fetchBoard: (boardId) => dispatch(fetchBoard(boardId)),

  fetchPieces: (userId) => dispatch(fetchPieces(userId)),
  createPiece: (payload) => dispatch(createPiece(payload)),
  deletePiece: (payload) => dispatch(deletePiece(payload)),

  createToken: (token) => dispatch(createToken(token))
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
