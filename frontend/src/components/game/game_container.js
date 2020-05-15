import {connect} from 'react-redux'
import Game from './game';
import { createBoard } from '../../actions/board_actions';


const mapStateToProps = (state) => ({
    board: {}
    // tokens: state.
})
const mapDispatchToProps = (dispatch) => ({
    createBoard: (board) => dispatch(createBoard(board))
})

export default connect(mapStateToProps, mapDispatchToProps)(Game)