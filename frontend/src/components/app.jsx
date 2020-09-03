import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ProtectedRoute } from '../util/route_util';
// import LoginContainer from './users/login_container.js';
// import SignupContainer from './users/signup_container';
// import { AuthRoute, ProtectedRoute } from '../utils/route_util';
// import MainPage from "./main/main_page"
import Splash from './splash/splash';
import ClientContainer from './game/client_container';
import './reset.css';
import './structure.scss';
import Main from './user/main';
import AboutUs from './splash/about_us';
import CombatTracker from './combat-tracker/combat-tracker';


function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/about" component={AboutUs} />
        <Route exact path="/" component={Splash} />
        <ProtectedRoute path="/client/:gameId/boards/:boardId" component={ClientContainer} />
        <ProtectedRoute path="/client/:gameId" component={ClientContainer} />
        <Route exact path="/tracker" component={CombatTracker} />
        <Route path="/" component={Main} />
      </Switch>
    </div>
  );
}

export default App;
