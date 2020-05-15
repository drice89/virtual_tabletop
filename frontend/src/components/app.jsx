import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
// import LoginContainer from './users/login_container.js';
// import SignupContainer from './users/signup_container';
// import { AuthRoute, ProtectedRoute } from '../utils/route_util';
// import MainPage from "./main/main_page"
import Splash from './splash/splash';
import GameContainer from './game/game_container';
import './reset.css';
import './structure.scss';
import Main from './user/main';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Splash} />
        {/* <ProtectedRoute exact path="/games" component={GameContainer} /> */}
        <ProtectedRoute exact path="/games/:gameId/boards" component={GameContainer} />
        <ProtectedRoute exact path="/games/:gameId/boards/:boardId" component={GameContainer} />
        <Route path="/" component={Main} />
      </Switch>
    </div>
  );
}

export default App;
