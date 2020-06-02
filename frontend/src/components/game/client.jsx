import React from 'react';
import FormData from 'form-data';
import io from 'socket.io-client';
import { Link } from 'react-router-dom';
import Nav from './ui/nav';
import GridContainer from './grid_container';
import styles from './client.module.scss';
import BoardWidget from './widgets/board_widget';

let socket;

class Client extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentBoard: null,
    };
    this.ENPOINT = 'localhost:5000/gamesNamespace';
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
      const { history, receiveBoard } = this.props;
      receiveBoard(board);
      history.push(`/client/${board.gameId}/boards/${board._id}`);
    });

    
  }

  // handlePieceDrop(move) {
  //   socket.emit('move', move);
  // }

  changeBoard(currentBoard) {
    this.setState({ currentBoard });
  }

  render() {
    const { currentBoard } = this.state;
    const {
      game, boards, match,
    } = this.props;
    if (!game) return null;
    return (
      <div className={styles.main}>
        <Nav />
        <BoardWidget boards={boards} gameId={game._id} />
        {match.params.boardId ? (
            <GridContainer socket={socket}/>
        ) : (
            <GridContainer create socket={socket} />
        )}
      </div>
    );
  }
}

export default Client;
