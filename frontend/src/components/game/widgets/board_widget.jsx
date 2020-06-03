import React from 'react';
import { compose } from 'redux';
import { FiTrash2, FiX } from 'react-icons/fi';
import { Link, withRouter } from 'react-router-dom';
import styles from './board_widget.module.scss';
import withWidget from '../util/with_widget';

// eslint-disable-next-line react/prefer-stateless-function
class BoardWidget extends React.Component {
  render() {
    const {
      boards, gameId, match, setBoardToDelete, toggleWidget,
    } = this.props;
    return (
      <div className={styles.boardMenu}>
        <div className={styles.menuBar}>
          <div className={styles.menuTitle}>
            <i className="ra ra-chessboard" />
            <h2>Boards</h2>
          </div>
          <button type="button" onClick={() => toggleWidget('widgetBoards')}>
            <FiX />
          </button>
        </div>
        <div className={styles.boardList}>
          <Link to={`/client/${gameId}`} className={match.params.boardId === undefined ? styles.active : ''}>
            Create A New Board
          </Link>
          {boards.map((board) => (
            <Link key={board._id} to={`/client/${gameId}/boards/${board._id}`} className={match.params.boardId === board._id ? styles.active : ''}>
              {board.name}
              <button type="button" className={styles.delete} onClick={() => setBoardToDelete(board)}>
                <FiTrash2 />
              </button>
            </Link>
          ))}
        </div>
      </div>

    );
  }
}

export default compose(withWidget, withRouter)(BoardWidget);
