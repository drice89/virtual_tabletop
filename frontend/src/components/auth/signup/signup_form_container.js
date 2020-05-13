import { connect } from 'react-redux';
import SignupForm from './signup_form';
import { signup, clearErrors } from '../../../actions/session_action';

const mapStateToProps = (state) => ({
  errors: state.errors.session,
});

const mapDispatchToProps = (dispatch) => ({
  login: (user) => dispatch(signup(user)),
  clearErrors: () => dispatch(clearErrors()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);
