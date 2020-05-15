import { RECEIVE_CURRENT_USER } from '../actions/session_action';
import { RECEIVE_USER } from '../actions/users_actions';

const usersReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return { ...state, ...{ [action.currentUser.id]: action.currentUser } };
    case RECEIVE_USER:
      return { ...state, ...{ [action.payload.user.id]: action.payload.user } };
    default:
      return state;
  }
};

export default usersReducer;
