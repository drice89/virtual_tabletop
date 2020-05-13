import { LOGOUT_CURRENT_USER, RECEIVE_CURRENT_USER } from '../actions/session_action';

const initialState = {
  isAuthenticated: false,
  userId: null,
};

const sessionReducer = (state = initialState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !!action.currentUser,
        userId: action.currentUser.id,
      };
    case LOGOUT_CURRENT_USER:
      return {
        isAuthenticated: false,
        userId: undefined,
      };
    default:
      return state;
  }
};

export default sessionReducer;
