import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Grid from './grid';
import { receiveBoard, fetchBoard, createBoard } from '../../actions/board_actions';
import { fetchPieces, createPiece, deletePiece } from '../../actions/users_actions';
import { createToken } from '../../actions/token_actions';

const mapStateToProps = (state, ownProps) => {
  const board = state.entities.boards[ownProps.match.params.boardId];
  return {
    create: ownProps.create,
    userId: state.session.userId,
    pieces: Object.values(state.entities.pieces),
    board,
    tokens: board && board.tokens ? board.tokens.map((tokenId) => state.entities.tokens[tokenId]) : [],
  };
};

const mapDispatchToProps = (dispatch) => ({
  createBoard: (board) => dispatch(createBoard(board)), // good
  fetchBoard: (boardId) => dispatch(fetchBoard(boardId)),

  fetchPieces: (userId) => dispatch(fetchPieces(userId)),
  createPiece: (payload) => dispatch(createPiece(payload)),
  deletePiece: (payload) => dispatch(deletePiece(payload)),

  // createToken: (token) => dispatch(createToken(token)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Grid));
