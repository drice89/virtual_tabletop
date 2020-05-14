import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const Auth = ({
  component: Component, path, currentUserId, exact,
}) => (
  <Route
    path={path}
    exact={exact}
    render={(props) => (!currentUserId ? <Component {...props} /> : <Redirect to={`/user/${currentUserId}`} />)}
  />
);

const Protected = ({
  component: Component, path, currentUserId, exact,
}) => (
  <Route
    path={path}
    exact={exact}
    render={(props) => (currentUserId ? <Component {...props} /> : <Redirect to="/" />)}
  />
);


const mapStateToProps = (state) => ({ currentUserId: state.session.userId });

export const AuthRoute = withRouter(connect(mapStateToProps)(Auth));

export const ProtectedRoute = withRouter(connect(mapStateToProps)(Protected));
