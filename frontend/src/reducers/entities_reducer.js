import { combineReducers } from 'redux';
import usersReducer from './users_reducer';
import gamesReducer from './games_reducer';
import boardReducer from './board_reducer';

const entitiesReducer = combineReducers({
  users: usersReducer,
  games: gamesReducer,
  board: boardReducer,
});

export default entitiesReducer;
