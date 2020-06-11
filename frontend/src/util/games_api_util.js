import axios from 'axios';

export const fetchGame = (gameId) => axios.get(`/api/games/${gameId}`);

// this is a call to the users route that returns games only - we may need to modify the
export const fetchUserGames = (userId) => axios.get(`/api/users/${userId}`);

export const createGame = (game) => axios.post('/api/games/create', game);

export const joinGame = (gameIdAndUserId) => axios.post('/api/games/join', gameIdAndUserId);

export const deleteGame = (gameId) => axios.delete(`/api/games/${gameId}`);

export const editGame = (game) => axios.patch('/api/games/edit', game);

export const fetchAll = () => axios.get('api/games');
