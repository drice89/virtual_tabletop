import React from 'react';
import { FiTrash2, FiX } from 'react-icons/fi';
import { Link, withRouter } from 'react-router-dom';
import styles from './board_widget.module.scss';

// eslint-disable-next-line react/prefer-stateless-function
class BoardWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dragging: false,
      opacity: 1,
      x: 10,
      y: 42,
      offsetX: 0,
      offsetY: 0,
    };
    this.startDrag = this.startDrag.bind(this);
    this.dragOver = this.dragOver.bind(this);
    this.endDrag = this.endDrag.bind(this);
  }

  startDrag(e) {
    this.setState({ opacity: 0.5, dragging: true });
    const { x, y } = this.state;
    this.setState({ offsetX: e.clientX - x, offsetY: e.clientY - y });
  }

  endDrag(e) {
    this.setState({ opacity: 1, dragging: false });
    const { offsetX, offsetY } = this.state;
    let endX = e.clientX - offsetX;
    if (endX < 0) {
      endX = 0;
    } else if (endX > window.innerWidth - 240) {
      endX = window.innerWidth - 240;
    }

    let endY = e.clientY - offsetY;
    if (endY < 0) {
      endY = 0;
    } else if (endY > window.innerHeight - e.currentTarget.clientHeight) {
      endY = window.innerHeight - e.currentTarget.clientHeight;
    }

    // console.log(endX);
    this.setState({ x: endX, y: endY });
  }

  dragOver(e) {
    e.preventDefault();
  }

  render() {
    const { boards, gameId, match } = this.props;
    const {
      dragging, opacity, x, y,
    } = this.state;
    return (
      <div className={dragging ? `${styles.coverContainer} ${styles.container}` : styles.container} onDragOver={this.dragOver}>
        <div className={styles.boardMenu} draggable onDragStart={this.startDrag} onDragEnd={this.endDrag} style={{ top: y, left: x, opacity }} bounds="parent">
          <div className={styles.menuBar}>
            <div className={styles.menuTitle}>
              <i className="ra ra-chessboard" />
              <h2>Boards</h2>
            </div>
            <button type="button">
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
                <button type="button" className={styles.delete}>
                  <FiTrash2 />
                </button>
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(BoardWidget);
