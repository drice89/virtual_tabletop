import React from 'react';
import io from 'socket.io-client';
import Nav from './ui/nav';
import GridContainer from './grid_container';
import styles from './client.module.scss';
import BoardWidget from './widgets/board_widget';
import ConfirmModal from './widgets/confirm_modal';


let socket;

class Client extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalDelete: null,
      widgetBoards: null,
      widgetSettings: null,
      update: false
    };
    this.ENPOINT = 'localhost:5000/gamesNamespace';
    // this.toggleModal = this.toggleModal.bind(this);
    this.setBoardToDelete = this.setBoardToDelete.bind(this);
    this.toggleWidget = this.toggleWidget.bind(this);
    this.resetUpdate = this.resetUpdate.bind(this)
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
      this.setState({update: true})
    });

    socket.on('boardCreated', (board) => {
      const { history, receiveBoard } = this.props;
      receiveBoard(board);
      if(board.creatorId === this.props.userId){
        history.push(`/client/${board.gameId}/boards/${board._id}`);
      }
    });

    socket.on('boardDeleted', (board) => {
      const { history, deleteBoard } = this.props;
      deleteBoard(board);
      const { boards } = this.props;
      history.push(boards.length === 0 ? `/client/${board.gameId}` : `/client/${board.gameId}/boards/${boards[0]._id}`);
    });

    socket.on('tokenUpdated', (token) => {
      const { receiveToken } = this.props;
      receiveToken(token);
      this.setState({ update: true })
    });

    socket.on('tokenDeleted', (token) => {
      const { deleteToken } = this.props;
      deleteToken(token._id);
      this.setState({ update: true })
    });
  }

  setBoardToDelete(modalDelete) {
    this.setState({ modalDelete });
  }

  toggleWidget(widget) {
    const currState = this.state[widget];
    this.setState({ [widget]: !currState });
  }

  resetUpdate(){
    this.setState({update:false})
  }

  render() {
    const {
      game, boards, match,
    } = this.props;
    const { modalDelete, widgetBoards, widgetSettings } = this.state;
    if (!game) return null;
    return (
      <>
        <div className={modalDelete ? `${styles.main} ${styles.blurred}` : styles.main}>
          <BoardWidget
            boards={boards}
            gameId={game._id}
            socket={socket}
            setBoardToDelete={this.setBoardToDelete}
            active={widgetBoards}
            x={10}
            y={42}
            toggleWidget={this.toggleWidget}
          />
         
          <Nav toggleWidget={this.toggleWidget} />
          {match.params.boardId ? (
            <GridContainer socket={socket} active={widgetSettings} toggleWidget={this.toggleWidget} update={this.state.update} resetUpdate={this.resetUpdate}/>
          ) : (
            <GridContainer create socket={socket} active={widgetSettings} toggleWidget={this.toggleWidget}/>
          )}
        </div>
        <ConfirmModal
          active={modalDelete}
          toggleModal={this.setBoardToDelete}
          board={modalDelete}
          socket={socket}
        />
      </>
    );
  }
}

export default Client;
