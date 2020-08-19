import { connect } from 'react-redux';
import LoginForm from './login_form';
import { login, clearErrors } from '../../../actions/session_action';

const mapStateToProps = (state) => ({
  errors: state.errors.session,
});

const mapDispatchToProps = (dispatch) => ({
  //the login thunk action is passed down to props
  login: (user) => dispatch(login(user)),
  clearErrors: () => dispatch(clearErrors()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
