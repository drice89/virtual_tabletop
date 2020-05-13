import { connect } from 'react-redux';
import SignupForm from './signup_form';
import { signup } from '../../../actions/session_action';

const mapStateToProps = (state) => ({
  errors: state.errors.session,
});

const mapDispatchToProps = (dispatch) => ({
  login: (user) => dispatch(signup(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);
