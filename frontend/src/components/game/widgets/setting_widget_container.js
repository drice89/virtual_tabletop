import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import withWidget from '../util/with_widget';
import SettingWidget from './setting_widget';

const mapStateToProps = (state, ownProps) => ({
  board: state.entities.boards[ownProps.match.params.boardId],
  socket: ownProps.socket,
});

export default compose(
  withWidget,
  withRouter,
  connect(mapStateToProps),
)(SettingWidget);
