import axios from 'axios';

export const fetchUser = (userId) => axios.get(`/api/users/${userId}`);


export const createPiece = (userId) => axios.post(`/api/users/${userId}/pieces`);

export const fetchPieces = (userId) => axios.get(`/api/users/${userId}/pieces`);
