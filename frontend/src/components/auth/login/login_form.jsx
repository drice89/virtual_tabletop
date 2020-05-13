import React from 'react';
import Nav from '../user_nav';
import styles from './login_form.module.scss';
import buttons from '../../buttons.module.scss';

const LoginForm = () => (
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
      <div className={styles.formContainer}>
        <input type="text" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button className={buttons.secondary}>Login</button>
      </div>
    </div>
  </div>
);

export default LoginForm;
