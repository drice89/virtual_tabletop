import { connect } from 'react-redux';
import Nav from './nav';
import { logout } from '../../../actions/session_action';

const mapStateToProps = (state) => ({
  currentUser: state.entities.users[state.session.userId],
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
