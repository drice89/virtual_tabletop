import { connect } from 'react-redux';
import UserShow from './user_show';
import { fetchUserGames } from '../../actions/users_actions';
import { deleteGame, joinGame } from '../../actions/games_actions';

const mapStateToProps = (state, ownProps) => {
  const user = state.entities.users[ownProps.match.params.userId];
  return {
    user,
    createdGames: user.createdGames ? user.createdGames.map((game) => state.entities.games[game]) : [],
    subscribedGames: user.subscribedGames ? user.subscribedGames.map((game) => state.entities.games[game]) : [],
    errors: state.errors.users,
    // pieces: Object.values(state.entities.pieces)
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchUserGames: () => dispatch(fetchUserGames(ownProps.match.params.userId)),
  deleteGame: (gameId) => dispatch(deleteGame(gameId)),
  joinGame: (payload) => dispatch(joinGame(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(UserShow);
