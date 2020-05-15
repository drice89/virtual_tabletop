import { connect } from 'react-redux';
import Game from './game';
import { createBoard, receiveBoard } from '../../actions/board_actions';


const mapStateToProps = (state) => ({
  board: {},
});

const mapDispatchToProps = (dispatch) => ({
  createBoard: (board) => dispatch(createBoard(board)),
  receiveBoard: (board) => dispatch(receiveBoard(board)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);