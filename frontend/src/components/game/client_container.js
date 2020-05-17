import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Client from './client';
import { fetchGame } from '../../actions/games_actions';

const mapStateToProps = (state, ownProps) => {
  const game = state.entities.games[ownProps.match.params.gameId];
  return {
    game,
    boards: game ? game.boards.map((boardId) => state.entities.boards[boardId]) : [],
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchGame: () => dispatch(fetchGame(ownProps.match.params.gameId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Client);
