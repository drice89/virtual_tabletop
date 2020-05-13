import React from 'react';
import { Switch, Route } from 'react-router-dom';
// import LoginContainer from './users/login_container.js';
// import SignupContainer from './users/signup_container';
// import { AuthRoute, ProtectedRoute } from '../utils/route_util';
// import MainPage from "./main/main_page"
import Grid from './game/grid';
import UI from './ui/ui';
import './reset.css';
import './structure.css';

function App() {
  return (
    <div className="App">
      <Switch>
        {/* <AuthRoute exact path="/login" component={LoginContainer} />
        <AuthRoute exact path="/signup" component={SignupContainer} />
        <AuthRoute exact path="/" component={MainPage} /> */}
        <Route path="/" component={UI} />
        <Route path="/" component={Grid} />
      </Switch>
    </div>
  );
}

export default App;
