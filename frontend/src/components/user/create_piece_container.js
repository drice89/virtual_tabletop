import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { createPiece } from '../../actions/pieces_action';
import Accordion from '../game/util/accordian';
import PieceForm from './piece_form';

const mapStateToProps = (state) => ({
  creatorId: state.session.userId,
  errors: state.errors.pieces,
  imageUrl: '',
  formType: 'Create Piece',
});

const mapDispatchToProps = (dispatch) => ({
  processForm: (piece) => dispatch(createPiece(piece)),
});

export default compose(
  Accordion,
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
)(PieceForm);
