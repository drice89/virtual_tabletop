import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../form.module.scss';
import buttons from '../../buttons.module.scss';
import Logo from '../../logo/logo';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '' };
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
    const { login } = this.props;
    this.setState({
      email: 'DemoUser@DemoUser.com',
      password: '123456',
    }, () => login(this.state));
  }

  handleChange(form) {
    return (e) => {
      this.setState({ [form]: e.target.value });
    };
  }

  render() {
    const { email, password } = this.state;
    const { errors } = this.props;
    return (
      <div className={styles.background}>
        <Logo />
        <form className={styles.formContainer} onSubmit={this.handleSubmit}>
          {errors.email ? <span className={styles.errors}>{errors.email}</span> : ''}
          <input type="text" name="email" placeholder="Email" value={email} onChange={this.handleChange('email')} />
          {errors.password ? <span className={styles.errors}>{errors.password}</span> : ''}
          <input type="password" name="password" placeholder="Password" value={password} onChange={this.handleChange('password')} />
          <button type="submit" className={buttons.demo} onClick={this.submitDemoUser}>Demo User</button>
          <button type="submit" className={buttons.secondary}>Login</button>
        </form>
        <span className={styles.linkAway}>
          New to Virtual Tabletop?&nbsp;
          <Link to="/signup">Sign Up</Link>
        </span>
      </div>
    );
  }
}

export default LoginForm;
