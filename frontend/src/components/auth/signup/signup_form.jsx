import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../form.module.scss';
import buttons from '../../buttons.module.scss';
import Logo from '../../logo/logo';

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayName: '', email: '', password: '', password2: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.submitDemoUser = this.submitDemoUser.bind(this);
  }

  componentDidMount() {
    const { clearErrors } = this.props;
    clearErrors();
  }

  handleSubmit(e) {
    e.preventDefault();
    const { login } = this.props;
    login(this.state);
  }

  submitDemoUser(e) {
    e.preventDefault();
    const { demoLogin } = this.props;
    this.setState({
      displayName: 'DemoUser',
      email: 'DemoUser@DemoUser.com',
      password: '123456',
      password2: '123456',
    }, () => demoLogin(this.state));
  }

  handleChange(form) {
    return (e) => {
      this.setState({ [form]: e.target.value });
    };
  }

  render() {
    const {
      displayName, email, password, password2,
    } = this.state;
    const { errors } = this.props;
    return (
      <div className={styles.background}>
        <Logo />
        <form className={styles.formContainer} onSubmit={this.handleSubmit}>
          {errors.displayName ? <span className={styles.errors}>{errors.displayName}</span> : ''}
          <input type="text" placeholder="Display Name" value={displayName} onChange={this.handleChange('displayName')} />
          {errors.email ? <span className={styles.errors}>{errors.email}</span> : ''}
          <input type="text" placeholder="Email" value={email} onChange={this.handleChange('email')} />
          {errors.password ? <span className={styles.errors}>{errors.password}</span> : ''}
          <input type="password" placeholder="Password" value={password} onChange={this.handleChange('password')} />
          {errors.password2 ? <span className={styles.errors}>{errors.password2}</span> : ''}
          <input type="password" placeholder="Repeat Password" value={password2} onChange={this.handleChange('password2')} />
          <button onClick={this.submitDemoUser} type="button" className={buttons.demo}>Demo User</button>
          <button type="submit" className={buttons.secondary}>Sign Up</button>
        </form>
        <span className={styles.linkAway}>
          Have an account?&nbsp;
          <Link to="/login">Login</Link>
        </span>
      </div>
    );
  }
}

export default SignupForm;
