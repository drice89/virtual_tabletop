import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import styles from './board_widget.module.scss';

// eslint-disable-next-line react/prefer-stateless-function
class BoardWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      opacity: 1,
      x: 10,
      y: 42,
      offsetX: 0,
      offsetY: 0,
    };
    this.startDrag = this.startDrag.bind(this);
    this.endDrag = this.endDrag.bind(this);
    this.dragOver = this.dragOver.bind(this);
  }

  startDrag(e) {
    this.setState({ opacity: 0.3 });
    const { x, y } = this.state;
    this.setState({ offsetX: e.clientX - x, offsetY: e.clientY - y});
  }

  endDrag(e) {
    this.setState({ opacity: 1 });
    const { offsetX, offsetY } = this.state;
    this.setState({ x: e.clientX - offsetX, y: e.clientY - offsetY });
  }

  dragOver(e) {
    e.preventDefault();
  }

  render() {
    const { boards, gameId, match } = this.props;
    const { opacity, x, y } = this.state;
    return (
      <div className={styles.container} onDragOver={this.dragOver} onDrop={this.endDrag}>
        <div className={styles.boardMenu} draggable onDragStart={this.startDrag} style={{ top: y, left: x, opacity }}>
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
      </div>
    );
  }
}

export default withRouter(BoardWidget);
