import { combineReducers } from 'redux';
import usersReducer from './users_reducer';
import gamesReducer from './games_reducer';
import boardReducer from './board_reducer';
import tokensReducer from './tokens_reducer';

const entitiesReducer = combineReducers({
  users: usersReducer,
  games: gamesReducer,
  boards: boardReducer,
  tokens: tokensReducer,
});

export default entitiesReducer;
