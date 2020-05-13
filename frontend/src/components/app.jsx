import React from 'react';
import { Switch, Route } from 'react-router-dom';
// import LoginContainer from './users/login_container.js';
// import SignupContainer from './users/signup_container';
// import { AuthRoute, ProtectedRoute } from '../utils/route_util';
// import MainPage from "./main/main_page"
import Splash from './splash/splash';
import Grid from './game/grid';
import UI from './ui/ui';
import LoginFormContainer from './auth/login/login_form_container';
import SignupFormContainer from './auth/signup/signup_form_container';
import './reset.css';
import './structure.scss';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Splash} />
        <Route path="/login" component={LoginFormContainer} />
        <Route path="/signup" component={SignupFormContainer} />
        {/* <AuthRoute exact path="/login" component={LoginContainer} />
        <AuthRoute exact path="/signup" component={SignupContainer} />
        <AuthRoute exact path="/" component={MainPage} /> */}
        <Route path="/game" component={UI} />
        <Route path="/game" component={Grid} />
      </Switch>
    </div>
  );
}

export default App;
