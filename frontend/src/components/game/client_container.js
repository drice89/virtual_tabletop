import { connect } from 'react-redux';
import Client from './client';
import { fetchGame } from '../../actions/games_actions';
import { receiveBoard, deleteBoard } from '../../actions/board_actions';
import { fetchPieces, createPiece, deletePiece } from '../../actions/users_actions';
import { createToken, receiveToken, deleteToken } from '../../actions/token_actions';

const mapStateToProps = (state, ownProps) => {
  const game = state.entities.games[ownProps.match.params.gameId];
  return {
    userId: state.session.userId,
    game,
    boards: game && game.boards ? game.boards.map((boardId) => state.entities.boards[boardId]) : [],
    pieces: Object.values(state.entities.pieces),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchGame: () => dispatch(fetchGame(ownProps.match.params.gameId)),
  receiveBoard: (board) => dispatch(receiveBoard(board)),
  deleteBoard: (board) => dispatch(deleteBoard(board)),

  fetchPieces: (userId) => dispatch(fetchPieces(userId)),
  createPiece: (payload) => dispatch(createPiece(payload)),
  deletePiece: (payload) => dispatch(deletePiece(payload)),

  createToken: (token) => dispatch(createToken(token)),
  receiveToken: (token) => dispatch(receiveToken(token)),
  deleteToken: (tokenId) => dispatch(deleteToken(tokenId)),

});

export default connect(mapStateToProps, mapDispatchToProps)(Client);
