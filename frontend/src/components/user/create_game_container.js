import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import CreateGame from './create_game';
import { createGame } from '../../actions/games_actions';

const mapStateToProps = (state) => ({
  creatorId: state.session.userId,
  game: { _id: null, name: '', description: '', backgroundImage: '' },
  errors: state.errors.games,
  formType: 'Create Game',
});

const mapDispatchToProps = (dispatch) => ({
  processForm: (game) => dispatch(createGame(game)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CreateGame));
