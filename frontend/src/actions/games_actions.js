import * as gameAPIUtil from "../util/games_api_util";

export const RECEIVE_GAMES = 'RECEIVE_GAMES';
export const RECEIVE_GAME = 'RECEIVE_GAME';
export const RECIEVE_GAME_ERRORS = 'RECEIVE_GAME_ERRORS';

export const receiveGames = (games) => ({
  type: RECEIVE_GAMES,
  games,
});

export const receiveGame = (game) => ({
  type: RECEIVE_GAME,
  game,
});

export const receiveGameErrors = (errors) => ({
  type: RECIEVE_GAME_ERRORS,
  errors,
});


export const fetchUserGames = (userId) => (dispatch) => (
  gameAPIUtil.fetchUserGames(userId)
    .then((games) => dispatch(receiveGames(games)))
    .catch((err) => dispatch(receiveGameErrors(err)))
);

export const createGame = (game) => (dispatch) => (
  gameAPIUtil.createGame(game)
    .then((res) => dispatch(receiveGame(res)))
    .catch((err) => dispatch(receiveGameErrors(err)))
);

export const joinGame = (gameIdAndUserId) => (dispatch) => (
  gameAPIUtil.joinGame(gameIdAndUserId)
    .then(res => dispatch(receiveGame(res)))
    .catch((err) => dispatch(receiveGameErrors(err)))
);

export const fetchAll = () => (dispatch) => (
  gameAPIUtil.fetchAll()
    .then((games) => dispatch(receiveGames(games)))
    .catch((err) => dispatch(receiveGameErrors(err)))
);
