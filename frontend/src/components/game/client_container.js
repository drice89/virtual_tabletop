import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Client from './client';
// import { fetchGame } from '../../actions/games_actions';

const mapStateToProps = (state, ownProps) => ({
  game: {},
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  // fetchGame: () => dispatch(fetchGame(ownProps.match.params.gameId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Client);
