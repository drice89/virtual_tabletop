import { RECEIVE_CURRENT_USER } from '../actions/session_action';
import {
  RECEIVE_USER, RECEIVE_USER_INFO
} from '../actions/users_actions';
import { DELETE_GAME, RECEIVE_GAME, UNSUBSCRIBE_GAME } from '../actions/games_actions';

const usersReducer = (state = {}, action) => {
  Object.freeze(state);
  const nextState = { ...state };
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return { ...state, ...{ [action.currentUser._id]: action.currentUser } };
    case RECEIVE_USER:
      return { ...state, ...{ [action.payload.user._id]: action.payload.user } };
    case DELETE_GAME:
      const idx = nextState[action.game.creatorId].createdGames.indexOf(action.game._id);
      nextState[action.game.creatorId].createdGames.splice(idx, 1);
      return nextState;
    case UNSUBSCRIBE_GAME:
      const i = nextState[action.payload.userId].subscribedGames.indexOf(action.payload.game._id);
      nextState[action.payload.userId].subscribedGames.splice(i, 1);
      return nextState;
    case RECEIVE_USER_INFO:
      return { ...state, ...{ [action.user._id]: action.user } };
    case RECEIVE_GAME:
      action.payload.players.forEach(user => {
        nextState[user._id] = user  
      })
      return nextState;
    default:
      return state;
  }
};

export default usersReducer;
