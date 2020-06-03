import { RECEIVE_CURRENT_USER } from '../actions/session_action';
import { RECEIVE_USER } from '../actions/users_actions';
import { DELETE_GAME } from '../actions/games_actions';

const usersReducer = (state = {}, action) => {
  Object.freeze(state);
  const nextState = { ...state };
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return { ...state, ...{ [action.currentUser.id]: action.currentUser } };
    case RECEIVE_USER:
      return { ...state, ...{ [action.payload.user.id]: action.payload.user } };
    case DELETE_GAME:
      const idx = nextState[action.game.creatorId].createdGames.indexOf(action.game._id);
      nextState[action.game.creatorId].createdGames.splice(idx, 1);
      return nextState;
    default:
      return state;
  }
};

export default usersReducer;
