import React from 'react';
import FormData from 'form-data';
import io from 'socket.io-client';
import { Link } from 'react-router-dom';
import Nav from './ui/nav';
import GridContainer from './grid_container';
import styles from './client.module.scss';

let socket;

class Client extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentBoard: null,
    };
    this.ENPOINT = 'localhost:5000/gamesNamespace';
    this.createBoard = this.createBoard.bind(this);
  }

  componentDidMount() {
    const { fetchGame, match } = this.props;
    fetchGame();

    // set up sockets
    const roomId = match.params.gameId;
    socket = io(this.ENPOINT);
    socket.on('connect', () => {
      socket.emit('joinRoom', { roomId });
    });

    socket.on('boardUpdated', (board) => {
      // this.props.receiveBoard(board);
      const { history } = this.props;
      history.push(`/client/${board.gameId}/boards/${board._id}`);
    });
  }

  createBoard(rows, cols, gridZoomFactor, offsetX, offsetY, imageZoomFactor, backgroundImage) {
    const { createBoard, match } = this.props;
    const formData = new FormData();

    formData.append('name', 'Testing client component');
    formData.append('gameId', match.params.gameId);

    formData.append('rows', rows);
    formData.append('cols', cols);
    formData.append('gridZoomFactor', gridZoomFactor);

    formData.append('offsetX', offsetX);
    formData.append('offsetY', offsetY);
    formData.append('imageZoomFactor', imageZoomFactor);

    formData.append('gridColor', '#FFF');
    formData.append('opacity', 1);
    formData.append('backgroundImage', backgroundImage);

    createBoard(formData);
  }

  handlePieceDrop(move) {
    socket.emit('move', move);
  }

  changeBoard(currentBoard) {
    this.setState({ currentBoard });
  }

  render() {
    const { currentBoard } = this.state;
    const {
      game, boards, pieces, tokens, createPiece, userId, createToken, match
    } = this.props;
    if (!game) return null;
    return (
      <div className={styles.main}>
        <Nav />
        <div className={styles.boardMenu}>
          <div className={styles.menuTitle}>
            <i className="ra ra-chessboard" />
            <h2>Boards</h2>
          </div>
          <div className={styles.boardList}>
            <Link to={`/client/${game._id}`}>
              <button type="button"  className={match.params.boardId === undefined ? styles.active : ''}>
                Create A New Board
              </button>
            </Link>
            {boards.map((board, index) => (
              <Link to={`/client/${game._id}/boards/${board._id}`}>
                <button type="button" className={match.params.boardId === board._id ? styles.active : ''}>
                  {board.name}
                </button>
              </Link>
            ))}
          </div>
        </div>
        {match.params.boardId ? (
          <GridContainer />
        ) : (
          <GridContainer create />
        )}
      </div>
    );
  }
}

export default Client;
