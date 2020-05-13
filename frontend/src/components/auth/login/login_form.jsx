import React from 'react';
import { Link } from 'react-router-dom';
import Nav from '../user_nav';
import styles from '../form.module.scss';
import buttons from '../../buttons.module.scss';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '' };
    this.handleSubmit = this.handleSubmit.bind(this);
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

  handleChange(form) {
    return (e) => {
      this.setState({ [form]: e.target.value });
    };
  }

  render() {
    const { email, password } = this.state;
    const { errors } = this.props;
    return (
      <div className={styles.main}>
        <Nav />
        <div className={styles.background}>
          <div className={styles.logo}>
            <i className="ra ra-hood" />
            <div>
              <p>Virtual</p>
              <p>Tabletop</p>
            </div>
          </div>
          <form className={styles.formContainer} onSubmit={this.handleSubmit}>
            {errors.email ? <span className={styles.errors}>{errors.email}</span> : ''}
            <input type="text" placeholder="Email" value={email} onChange={this.handleChange('email')} />
            {errors.password ? <span className={styles.errors}>{errors.password}</span> : ''}
            <input type="password" placeholder="Password" value={password} onChange={this.handleChange('password')} />
            <button type="submit" className={buttons.secondary}>Login</button>
          </form>
          <span className={styles.linkAway}>
            New to Virtual Tabletop?&nbsp;
            <Link to="/signup">Sign Up</Link>
          </span>
        </div>
      </div>
    );
  }
}

export default LoginForm;
