import axios from 'axios';

export const fetchBoard = (boardId) => axios.get(`/api/boards/${boardId}`);