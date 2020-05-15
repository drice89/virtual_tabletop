import axios from 'axios';

export const createBoard = (board) => (axios.post('/api/boards', board ,{ headers: {
    'accept': 'application/json',
    'Accept-Language': 'en-US,en;q=0.8',
    'Content-Type': `multipart/form-data`,
}}))   