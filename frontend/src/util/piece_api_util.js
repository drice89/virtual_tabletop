import axios from 'axios';

export const createPiece = (piece) => (axios.post('/api/pieces/create', piece, {
  headers: {
    'accept': 'application/json',
    'Accept-Language': 'en-US,en;q=0.8',
    'Content-Type': `multipart/form-data`,
  }
}))
