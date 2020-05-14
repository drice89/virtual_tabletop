import { combineReducers } from 'redux';
import usersReducer from './users_reducer';
import gamesReducer from './games_reducer';

const entitiesReducer = combineReducers({
  users: usersReducer,
  games: gamesReducer,
});

export default entitiesReducer;
