import * as usersAPIUtil from '../util/users_api_util';

export const RECEIVE_USER = 'RECEIVE_USER';
export const RECEIVE_USER_ERRORS = 'RECEIVE_USER_ERRORS';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';

const receiveUser = (payload) => ({
  type: RECEIVE_USER,
  payload,
});

const receiveErrors = (errors) => ({
  type: RECEIVE_USER_ERRORS,
  errors,
});

export const fetchUser = (userId) => (dispatch) => (
  usersAPIUtil.fetchUser(userId)
    .then((payload) => dispatch(receiveUser(payload.data)))
    .catch((err) => dispatch(receiveErrors(err)))
);
