import React from 'react';
import LoginFormContainer from '../auth/login/login_form_container';
import SignupFormContainer from '../auth/signup/signup_form_container';
import { AuthRoute, ProtectedRoute } from '../../util/route_util';
import Nav from './nav/nav';
import styles from './main.module.scss';

const Main = () => (
  <div className={styles.main}>
    <Nav />
    <AuthRoute path="/login" component={LoginFormContainer} />
    <AuthRoute path="/signup" component={SignupFormContainer} />
  </div>
);

export default Main;
