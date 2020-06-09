import {
  connect
} from 'react-redux';
import {
  withRouter
} from 'react-router-dom';
import {
  createPiece,
  deletePiece
} from '../../actions/pieces_action';
import CreatePiece from './create_piece';

const mapStateToProps = (state) => ({
  myColor: state.entities.users[state.session.userId].color,
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CreatePiece));