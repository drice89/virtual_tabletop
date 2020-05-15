import jwtDecode from 'jwt-decode';
import * as SessionAPIUtil from '../util/session_api_util';

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS';
export const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';

const receiveCurrentUser = (currentUser) => ({
  type: RECEIVE_CURRENT_USER,
  currentUser,
});

const logoutCurrentUser = () => ({
  type: LOGOUT_CURRENT_USER,
});

const receiveErrors = (errors) => ({
  type: RECEIVE_SESSION_ERRORS,
  errors,
});

export const clearErrors = () => ({
  type: CLEAR_ERRORS,
});


export const login = (user) => (dispatch) => SessionAPIUtil.login(user)
  .then((res) => {
    const { token } = res.data;

    localStorage.setItem('jwtToken', token);
    SessionAPIUtil.setAuthToken(token);
    const decoded = jwtDecode(token);
    dispatch(receiveCurrentUser(decoded));
    return decoded;
  })
  .catch((err) => {
    dispatch(receiveErrors(err.response.data));
  });

export const logout = () => (dispatch) => {
  localStorage.removeItem('jwtToken');
  SessionAPIUtil.setAuthToken(false);
  dispatch(logoutCurrentUser());
};

export const signup = (user) => (dispatch) => SessionAPIUtil.signup(user)
  .then((res) => {
    const { token } = res.data;

    localStorage.setItem('jwtToken', token);
    SessionAPIUtil.setAuthToken(token);
    const decoded = jwtDecode(token);
    dispatch(receiveCurrentUser(decoded));
  })
  .catch((err) => {
    dispatch(receiveErrors(err.response.data));
  });
