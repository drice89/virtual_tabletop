import { RECEIVE_GAME_ERRORS, RECEIVE_GAME, CLEAR_ERRORS } from '../actions/games_actions';

const gamesErrorsReducer = (state = [], action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_GAME_ERRORS:
      return action.errors;
    case RECEIVE_GAME:
      return [];
    case CLEAR_ERRORS:
      return [];
    default:
      return state;
  }
};

export default gamesErrorsReducer;
