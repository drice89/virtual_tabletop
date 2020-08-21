import * as gameAPIUtil from '../util/games_api_util';

export const RECEIVE_GAMES = 'RECEIVE_GAMES';
export const RECEIVE_GAME = 'RECEIVE_GAME';
export const EDIT_GAME = 'EDIT_GAME';
export const DELETE_GAME = 'DELETE_GAME';
export const RECEIVE_GAME_ERRORS = 'RECEIVE_GAME_ERRORS';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';
export const UNSUBSCRIBE_GAME = 'UNSUBSCRIBE_GAME';

export const receiveGames = (payload) => ({
  type: RECEIVE_GAMES,
  payload,
});

export const removeGame = (game) => ({
  type: DELETE_GAME,
  game,
});

export const unsubscribeGame = (payload) => ({
  type: UNSUBSCRIBE_GAME,
  payload,
});

export const receiveGame = (payload) => ({
  type: RECEIVE_GAME,
  payload,
});

export const receiveEditedGame = (payload) => ({
  type: EDIT_GAME,
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
    .catch((err) => dispatch(receiveGameErrors(err.response.data)))
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
    .catch((err) => dispatch(receiveGameErrors(err.response.data)))
);

export const joinGame = ( { gameIdAndUserId, history }) => (dispatch) => (
  gameAPIUtil.joinGame(gameIdAndUserId)
    .then((res) => {
      dispatch(receiveGame(res.data));
      history.push(`/client/${res.data.game._id}`);
    })
    .catch((err) => dispatch(receiveGameErrors(err.response.data)))
);

export const unsubscribe = ( { gameIdAndUserId }) => (dispatch) => (
  gameAPIUtil.unsubscribe(gameIdAndUserId)
    .then((res) => {
      dispatch(unsubscribeGame( {game: res.data.game, userId: gameIdAndUserId.userId}))
    })
    .catch((err) => dispatch(receiveGameErrors(err.response.data)))
);

export const fetchAll = () => (dispatch) => (
  gameAPIUtil.fetchAll()
    .then((games) => dispatch(receiveGames(games.data)))
    .catch((err) => dispatch(receiveGameErrors(err.response.data)))
);

export const editGame = (game) => (dispatch) => (
  gameAPIUtil.editGame(game)
    .then((editedGame) => {
      dispatch(receiveEditedGame(editedGame.data));
      return 1;
    })
    .catch((err) => { dispatch(receiveGameErrors(err.response.data)); })
);