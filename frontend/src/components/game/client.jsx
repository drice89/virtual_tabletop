import React from 'react';
import io from 'socket.io-client';
import Nav from './ui/nav';
import GridContainer from './grid_container';
import styles from './client.module.scss';
import BoardWidget from './widgets/board_widget';
import ConfirmModal from './widgets/confirm_modal';
import SettingWidgetContainer from './widgets/setting_widget_container';
import ChatWidget from './widgets/chat_widget';


class Client extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalDelete: null,
      widgetBoards: null,
      widgetSettings: null,
      update: false,
      widgetChat: null,
      widgetDelete: true,
    };
    this.ENPOINT = 'localhost:5000/gamesNamespace';
    this.socket = io(this.ENPOINT);
    // this.toggleModal = this.toggleModal.bind(this);
    this.setBoardToDelete = this.setBoardToDelete.bind(this);
    this.toggleWidget = this.toggleWidget.bind(this);
    this.resetUpdate = this.resetUpdate.bind(this)
  }

  componentDidMount() {
    const { fetchGame, match, fetchUser, userId } = this.props;
    fetchGame();

    // set up sockets
    const roomId = match.params.gameId;
    const { socket } = this;

    socket.on('connect', () => {
      socket.emit('joinRoom', { roomId });
      fetchUser(userId);
    });

    socket.on('boardUpdated', (board) => {
      const { history, receiveBoard } = this.props;
      
      receiveBoard(board)
      
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
      // deleteToken(token._id);
      this.setState({ update: true })
      deleteToken(token);
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
      game, boards, match, fetchUser
    } = this.props;
    const { modalDelete, widgetBoards, widgetSettings, widgetChat, widgetDelete } = this.state;
    const { socket } = this;
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
          <ChatWidget
            x={510}
            y={42}
            socket={socket}
            active={widgetChat}
            toggleWidget={this.toggleWidget}
          />
          <Nav toggleWidget={this.toggleWidget} />
          {match.params.boardId ? (
            <GridContainer socket={socket} settingActive={widgetSettings} deleteActive={widgetDelete} toggleWidget={this.toggleWidget} update={this.state.update} resetUpdate={this.resetUpdate} fetchUser={fetchUser}/>
          ) : (
            <GridContainer create socket={socket} settingActive={widgetSettings} toggleWidget={this.toggleWidget} fetchUser={fetchUser}/>
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
