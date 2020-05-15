import { connect } from 'react-redux';
import UserShow from './user_show';
import { fetchUser } from '../../actions/users_actions';

const mapStateToProps = (state, ownProps) => ({
  user: state.entities.users[ownProps.match.params.userId],
  errors: state.errors.users,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchUser: () => dispatch(fetchUser(ownProps.match.params.userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserShow);
