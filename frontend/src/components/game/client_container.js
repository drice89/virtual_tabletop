import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Client from './client';
import { fetchGame } from '../../actions/games_actions';
import { receiveBoard, createBoard } from '../../actions/board_actions';

const mapStateToProps = (state, ownProps) => {
  const game = state.entities.games[ownProps.match.params.gameId];
  return {
    game,
    boards: game && game.boards ? game.boards.map((boardId) => state.entities.boards[boardId]) : [],
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchGame: () => dispatch(fetchGame(ownProps.match.params.gameId)),
  receiveBoard: (board) => dispatch(receiveBoard(board)),
  createBoard: (board) => dispatch(createBoard(board)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Client);
