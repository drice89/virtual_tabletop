import axios from 'axios';

// this is a call to the users route that returns games only - we may need to modify the
export const fetchUserGames = (userId) => axios.get(`/api/users/${userId}`);

export const createGame = (game) => axios.post('/api/games/create', game);

export const joinGame = (gameIdAndUserId) => axios.patch('/api/games/join', gameIdAndUserId);

export const fetchAll = () => axios.get('api/games');
