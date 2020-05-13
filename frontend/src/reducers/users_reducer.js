import { RECEIVE_CURRENT_USER } from '../actions/session_action';

const usersReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return { ...state, ...{ [action.currentUser.id]: action.currentUser } };
    default:
      return state;
  }
};

export default usersReducer;
