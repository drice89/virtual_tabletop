import * as gameAPIUtil from '../util/games_api_util';

export const RECEIVE_GAMES = 'RECEIVE_GAMES';
export const RECEIVE_GAME = 'RECEIVE_GAME';
export const DELETE_GAME = 'DELETE_GAME';
export const RECEIVE_GAME_ERRORS = 'RECEIVE_GAME_ERRORS';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';

export const receiveGames = (payload) => ({
  type: RECEIVE_GAMES,
  payload,
});

export const removeGame = (game) => ({
  type: DELETE_GAME,
  game,
});

export const receiveGame = (payload) => ({
  type: RECEIVE_GAME,
  payload,
});

export const receiveGameErrors = (errors) => ({
  type: RECEIVE_GAME_ERRORS,
  errors,
});

export const fetchGame = (gameId) => (dispatch) => (
  gameAPIUtil.fetchGame(gameId)
    .then((game) => dispatch(receiveGame(game.data)))
    .catch((err) => { dispatch(receiveGameErrors(err.response.data)); })
);

export const fetchUserGames = (userId) => (dispatch) => (
  gameAPIUtil.fetchUserGames(userId)
    .then((games) => dispatch(receiveGames(games.data)))
    .catch((err) => dispatch(receiveGameErrors(err)))
);

export const createGame = (game) => (dispatch) => (
  gameAPIUtil.createGame(game)
    .then((resGame) => {
      dispatch(receiveGame(resGame.data));
      return resGame.data.game._id;
    })
    .catch((err) => { dispatch(receiveGameErrors(err.response.data)); })
);

export const deleteGame = (gameId) => (dispatch) => (
  gameAPIUtil.deleteGame(gameId)
    .then((res) => dispatch(removeGame(res.data)))
    .catch((err) => dispatch(receiveGameErrors(err)))
);

export const joinGame = (gameIdAndUserId) => (dispatch) => (
  gameAPIUtil.joinGame(gameIdAndUserId)
    .then((res) => dispatch(receiveGame(res.data)))
    .catch((err) => dispatch(receiveGameErrors(err)))
);

export const fetchAll = () => (dispatch) => (
  gameAPIUtil.fetchAll()
    .then((games) => dispatch(receiveGames(games.data)))
    .catch((err) => dispatch(receiveGameErrors(err)))
);
