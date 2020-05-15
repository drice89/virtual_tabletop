import { connect } from 'react-redux';
import Game from './game';
import { receiveBoard, fetchBoard } from '../../actions/board_actions';

const mapStateToProps = (state, ownProps) => ({
  board: state.entities.boards[ownProps.match.params.boardId],
  // tokens: state.

});
const mapDispatchToProps = (dispatch) => ({
  receiveBoard: (board) => dispatch(receiveBoard(board)),
  fetchBoard: (boardId) => dispatch(fetchBoard(boardId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
