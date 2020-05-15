import { connect } from 'react-redux';
import Game from './game';
import { receiveBoard } from '../../actions/board_actions';

const mapStateToProps = (state, ownProps) => ({
  board: state.entities.boards[ownProps.match.params.boardId],
  // tokens: state.

});
const mapDispatchToProps = (dispatch) => ({
  receiveBoard: (board) => dispatch(receiveBoard(board)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
