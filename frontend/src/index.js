import React from 'react';
import ReactDOM from 'react-dom';
import jwtDecode from 'jwt-decode';
import Root from './components/root';
import { setAuthToken } from './util/session_api_util';
import configureStore from './store/store';
import { login, logout, signup } from './actions/session_action';
import { createGame, fetchUserGames, fetchAll } from './actions/games_actions';
import { fetchUser } from './actions/users_actions';
import { fetchBoard } from './util/boards_api_util';
import { fetchGame } from './util/games_api_util';


document.addEventListener('DOMContentLoaded', () => {
  let store;

  if (localStorage.jwtToken) {
    setAuthToken(localStorage.jwtToken);
    const decodedUser = jwtDecode(localStorage.jwtToken);
    const preloadedState = {
      entities: {
        users: {
          [decodedUser._id]: decodedUser,
        },
      },
      session: {
        isAuthenticated: true,
        userId: decodedUser._id,
      },
    };

    store = configureStore(preloadedState);
    const currentTime = Date.now() / 1000;
    if (decodedUser.exp < currentTime) {
      store.dispatch(logout());
      window.location.href = '/login';
    }
  } else {
    store = configureStore();
  }

  window.dispatch = store.dispatch;
  window.getState = store.getState;
  window.login = login;
  window.logout = logout;
  window.signup = signup;
  window.createGame = createGame;
  window.fetchUserGames = fetchUserGames;
  window.fetchAll = fetchAll;
  window.fetchUser = fetchUser;
  window.fetchBoard = fetchBoard;
  window.fetchGame = fetchGame;

  const root = document.getElementById('root');
  ReactDOM.render(<Root store={store} />, root);
});
