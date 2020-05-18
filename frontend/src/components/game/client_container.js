import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Client from './client';
import { fetchGame } from '../../actions/games_actions';
import { receiveBoard, createBoard } from '../../actions/board_actions';
import { fetchPieces, createPiece, deletePiece } from '../../actions/users_actions';
import { createToken } from '../../actions/token_actions';

const mapStateToProps = (state, ownProps) => {
  const game = state.entities.games[ownProps.match.params.gameId];
  return {
    userId: state.session.userId,
    game,
    boards: game && game.boards ? game.boards.map((boardId) => state.entities.boards[boardId]) : [],
    pieces: Object.values(state.entities.pieces),
    tokens: Object.values(state.entities.tokens),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchGame: () => dispatch(fetchGame(ownProps.match.params.gameId)),
  receiveBoard: (board) => dispatch(receiveBoard(board)),
  createBoard: (board) => dispatch(createBoard(board)),

  fetchPieces: (userId) => dispatch(fetchPieces(userId)),
  createPiece: (payload) => dispatch(createPiece(payload)),
  deletePiece: (payload) => dispatch(deletePiece(payload)),

  createToken: (token) => dispatch(createToken(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Client);
