import React from 'react';
import FormData from 'form-data';
import io from 'socket.io-client';
import Nav from './ui/nav';
import Grid from './grid';
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
    // set up sockets
    fetchGame();

    const roomId = match.params.gameId;
    socket = io(this.ENPOINT);
    socket.on('connect', () => {
      socket.emit('joinRoom', { roomId });
    });

    socket.on('boardCreated', (board) => {
      // this.props.receiveBoard(board);
      const { history } = this.props;
      history.push(`/games/${board.gameId}/boards/${board._id}`);
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
      boards, pieces, tokens, createPiece, userId, createToken,
    } = this.props;
    return (
      <div className={styles.main}>
        <Nav />
        <div className={styles.boardMenu}>
          <div className={styles.menuTitle}>
            <i className="ra ra-chessboard" />
            <h2>Boards</h2>
          </div>
          <div className={styles.boardList}>
            <button type="button" onClick={() => this.changeBoard(null)} className={currentBoard === null ? styles.active : ''}>
              Create A New Board
            </button>
            {boards.map((board, index) => (
              <button type="button" onClick={() => this.changeBoard(index)} className={currentBoard === index ? styles.active : ''}>
                {board.name}
              </button>
            ))}
          </div>
        </div>
        {currentBoard !== null
          ? (
            <Grid
              userId={userId}
              board={boards[currentBoard]}
              pieces={pieces}
              tokens={tokens}
              createPiece={createPiece}
              createToken={createToken}
            />
          )
          : <Grid createBoard={this.createBoard} create />}

      </div>
    );
  }
}

export default Client;
