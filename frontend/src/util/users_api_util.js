import axios from 'axios';

export const fetchUserInfo = (userId) => axios.get(`/api/users/${userId}/info`);
export const fetchUser = (userId) => axios.get(`/api/users/${userId}`);



export const fetchPieces = (userId) => axios.get(`/api/users/${userId}/pieces`);
export const createPiece = (payload) => axios.post(`/api/users/${payload.userId}/pieces`, payload.piece);
export const deletePiece = (payload) => axios.delete(`/api/users/${payload.userId}/pieces/${payload.pieceId}`);
