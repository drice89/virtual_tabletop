import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

// Will redirect the to the user show page if logged in
const Auth = ({
  component: Component, path, currentUserId, exact,
}) => (
  <Route
    path={path}
    exact={exact}
    render={(props) => (!currentUserId ? <Component {...props} /> : <Redirect to={`/user/${currentUserId}`} />)}
  />
);

// Prevents users from accessing this route unless they are logged in 
const Protected = ({
  component: Component, path, currentUserId, exact,
}) => (
  <Route
    path={path}
    exact={exact}
    // if the user is logged in (there is a current user ID in the )
    render={(props) => (currentUserId ? <Component {...props} /> : <Redirect to="/login" />)}
  />
);


const mapStateToProps = (state) => ({ currentUserId: state.session.userId });

export const AuthRoute = withRouter(connect(mapStateToProps)(Auth));

export const ProtectedRoute = withRouter(connect(mapStateToProps)(Protected));
