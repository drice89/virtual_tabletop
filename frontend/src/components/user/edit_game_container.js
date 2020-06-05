import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import withModal from '../game/util/with_modal';
import CreateGame from './create_game';
import { editGame } from '../../actions/games_actions';
import { clearErrors } from '../../actions/session_action';

const mapStateToProps = (state, ownProps) => ({
  creatorId: state.session.userId,
  game: state.entities.games[ownProps.gameId],
  errors: state.errors.games,
  formType: 'Edit Game',
});

const mapDispatchToProps = (dispatch) => ({
  processForm: (game) => dispatch(editGame(game)),
  clearErrors: () => dispatch(clearErrors()),
});

export default compose(
  withModal,
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
)(CreateGame);
