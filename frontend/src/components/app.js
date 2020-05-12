import React from 'react';
import { Switch, Route } from 'react-router-dom';
// import LoginContainer from './users/login_container.js';
// import SignupContainer from './users/signup_container';
// import { AuthRoute, ProtectedRoute } from '../utils/route_util';
// import MainPage from "./main/main_page"
import Grid from './game/grid';
import UI from './ui/ui';

function App() {
  return (
    <div className="App">
      <Switch>
        {/* <AuthRoute exact path="/login" component={LoginContainer} />
        <AuthRoute exact path="/signup" component={SignupContainer} />
        <AuthRoute exact path="/" component={MainPage} /> */}
        <Route path="/" component={Grid} />
        <Route path="/" component={UI} />
      </Switch>
    </div>
  );
}

export default App;
