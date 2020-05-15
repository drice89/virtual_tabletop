import React from 'react';
import LoginFormContainer from '../auth/login/login_form_container';
import SignupFormContainer from '../auth/signup/signup_form_container';
import { AuthRoute, ProtectedRoute } from '../../util/route_util';
import NavContainer from './nav/nav_container';
import styles from './main.module.scss';
import UserShowContainer from './user_show_container';

const Main = () => (
  <div className={styles.main}>
    <NavContainer />
    <AuthRoute path="/login" component={LoginFormContainer} />
    <AuthRoute path="/signup" component={SignupFormContainer} />
    <ProtectedRoute path="/user/:userId" component={UserShowContainer} />
  </div>
);

export default Main;
