import * as gameAPIUtil from '../util/games_api_util';

export const RECEIVE_GAMES = 'RECEIVE_GAMES';
export const RECEIVE_GAME = 'RECEIVE_GAME';
export const RECIEVE_GAME_ERRORS = 'RECEIVE_GAME_ERRORS';

export const receiveGames = (payload) => ({
  type: RECEIVE_GAMES,
  payload,
});

export const receiveGame = (payload) => ({
  type: RECEIVE_GAME,
  payload,
});

export const receiveGameErrors = (errors) => ({
  type: RECIEVE_GAME_ERRORS,
  errors,
});


export const fetchUserGames = (userId) => (dispatch) => (
  gameAPIUtil.fetchUserGames(userId)
    .then((games) => dispatch(receiveGames(games.data)))
    .catch((err) => dispatch(receiveGameErrors(err)))
);

export const createGame = (game) => (dispatch) => (
  gameAPIUtil.createGame(game)
    .then((resGame) => dispatch(receiveGame(resGame.data)))
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
