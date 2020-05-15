import { connect } from 'react-redux';
import UserShow from './user_show';
import { fetchUser } from '../../actions/users_actions';

const mapStateToProps = (state, ownProps) => {
  const user = state.entities.users[ownProps.match.params.userId];
  // debugger;
  return {
    user,
    createdGames: user.createdGames ? user.createdGames.map((game) => state.entities.games[game]) : [],
    subscribedGames: user.subscribedGames ? user.subscribedGames.map((game) => state.entities.games[game]) : [],
    errors: state.errors.users,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchUser: () => dispatch(fetchUser(ownProps.match.params.userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserShow);
