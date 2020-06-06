import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { createPiece, deletePiece } from '../../actions/pieces_action';
import Accordion from '../game/util/accordian';
import PieceForm from './piece_form';

const mapStateToProps = (state) => ({
  creatorId: state.session.userId,
  pieces: state.entities.pieces,
  errors: state.errors.pieces,
  imageUrl: '',
  formType: 'Create Piece',
});

const mapDispatchToProps = (dispatch) => ({
  processForm: (piece) => dispatch(createPiece(piece)),
  deletePiece: (payload) => dispatch(deletePiece(payload)),
});

export default compose(
  Accordion,
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
)(PieceForm);
