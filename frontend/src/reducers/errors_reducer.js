import { combineReducers } from 'redux';
import sessionErrorsReducer from './session_errors_reducer';
import usersErrorsReducer from './users_errors_reducer';
import gamesErrorsReducer from './games_errors_reducer';
import piecesErrorsReducer from './pieces_errors_reducer';

const errorsReducer = combineReducers({
  session: sessionErrorsReducer,
  users: usersErrorsReducer,
  games: gamesErrorsReducer,
  pieces: piecesErrorsReducer,
});

export default errorsReducer;
