import axios from 'axios';

export const createBoard = (board) => axios.post('http://localhost:5000/api/boards', board, {headers: {'Content-Type': 'multipart/form-data'}});
