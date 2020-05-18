
import {
    REMOVE_PIECE,
    RECEIVE_PIECE,
    RECEIVE_PIECES
} from '../actions/users_actions';

export default (state = {}, action) => {
    Object.freeze(state);
    let nextState = Object.assign({}, state)
    switch (action.type) {
        case RECEIVE_PIECES:
            return action.pieces
        case RECEIVE_PIECE:
            nextState[action.piece._id] = action.piece
            return nextState
        case REMOVE_PIECE:
            delete nextState[action.pieceId]
            return nextState
        default:
            return state;
    }
};
