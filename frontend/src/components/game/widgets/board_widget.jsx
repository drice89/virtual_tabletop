import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import styles from './board_widget.module.scss';

// eslint-disable-next-line react/prefer-stateless-function
class BoardWidget extends React.Component {
  startDrag(ev) {
    ev.target.style.transform = 'translateX(-9px)'
    return false
  }

  dragOver(e) {
    console.log(e.target.getBoundingClientRect())
  }

  render() {
    const { boards, gameId, match } = this.props;
    return (
      <div className={styles.boardMenu} draggable onMouseDown={this.startDrag} style={{ top: '42px', left: '10px' }}>
        <div className={styles.menuTitle}>
          <i className="ra ra-chessboard" />
          <h2>Boards</h2>
        </div>
        <div className={styles.boardList}>
          <Link to={`/client/${gameId}`}>
            <button type="button" className={match.params.boardId === undefined ? styles.active : ''}>
              Create A New Board
            </button>
          </Link>
          {boards.map((board) => (
            <Link to={`/client/${gameId}/boards/${board._id}`}>
              <button type="button" className={match.params.boardId === board._id ? styles.active : ''}>
                {board.name}
              </button>
            </Link>
          ))}
        </div>
      </div>
    );
  }
}

export default withRouter(BoardWidget);
