
import {
    REMOVE_PIECE,
    RECEIVE_PIECE,
    RECEIVE_PIECES
} from '../actions/users_actions';

export default (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_PIECES:
            return action.pieces
        case RECEIVE_PIECE:
            return action.pieces.push(action.piece)
        case REMOVE_PIECE:
            let nextState = Object.assign({}, state)
            nextState[action.]
            return {
                ...state, ...action.pieces
            };
        default:
            return state;
    }
};
