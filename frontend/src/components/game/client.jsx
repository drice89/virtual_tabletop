import React from 'react';
import io from 'socket.io-client';
import { Redirect } from 'react-router-dom';
import Nav from './ui/nav';
import GridContainer from './grid_container';
import styles from './client.module.scss';
import BoardWidget from './widgets/board_widget';
import ConfirmModal from './widgets/confirm_modal';
import SettingWidgetContainer from './widgets/setting_widget_container';
import ChatWidget from './widgets/chat_widget';
import HelpWidget from './widgets/help_widget.jsx';
import PlayersWidget from './widgets/players_widget.jsx';


class Client extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      update: false,
      widgetBoards: true,
      widgetSettings: null,
      widgetChat: null,
      widgetHelp: null,
      widgetPlayers: null,
      widgetDelete: null,
      modalDelete: null,
    };
    this.ENPOINT = (process.env.NODE_ENV === 'production') ? 'https://virtualtabletop.herokuapp.com/gamesNamespace' : 'localhost:5000/gamesNamespace';
    this.socket = io(this.ENPOINT);
    // this.toggleModal = this.toggleModal.bind(this);
    this.setBoardToDelete = this.setBoardToDelete.bind(this);
    this.toggleWidget = this.toggleWidget.bind(this);
    this.resetUpdate = this.resetUpdate.bind(this);
  }

  componentDidMount() {
    const {
      fetchGame, match, fetchUser, userId, user, game,
    } = this.props;
    fetchGame().then(() => {
      const { boards, history } = this.props;
      if (boards.length !== 0) {
        history.push(`/client/${boards[0].gameId}/boards/${boards[0]._id}`);
      } else {
        this.setState({ widgetSettings: true });
      }
    });

    // set up sockets
    const roomId = match.params.gameId;
    const { socket } = this;


    socket.on('connect', () => {
      socket.emit('joinRoom', { roomId });
    });

    socket.on('boardUpdated', (payload) => {
      const { history, receiveBoard, receiveUserInfo } = this.props;

      receiveUserInfo(payload.user);
      receiveBoard(payload.result);

      this.setState({ update: true });
    });

    socket.on('boardCreated', (board) => {
      const { history, receiveBoard } = this.props;
      receiveBoard(board);
      if (board.creatorId === this.props.userId) {
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

      this.setState({ update: true }, () => receiveToken(token));
    });

    socket.on('tokenDeleted', (token) => {
      const { deleteToken } = this.props;
      // deleteToken(token._id);
      this.setState({ update: true }, () => deleteToken(token));
    });
  }

  setBoardToDelete(modalDelete) {
    this.setState({ modalDelete });
  }

  toggleWidget(widget) {
    const currState = this.state[widget];
    this.setState({ [widget]: !currState });
  }

  resetUpdate() {
    this.setState({ update: false });
  }

  componentWillUnmount() {
    window.onresize = (e) => {
      e.stopPropagation();
    };
  }

  render() {
    const {
      game, boards, match, fetchUser, userId, user, players
    } = this.props;
    const {
      modalDelete, widgetBoards, widgetSettings, widgetChat, widgetHelp, widgetDelete, widgetPlayers
    } = this.state;
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
            y={10}
            toggleWidget={this.toggleWidget}
            widgetSettings={widgetSettings}
          />
          <ChatWidget
            x={560}
            y={10}
            socket={socket}
            active={widgetChat}
            toggleWidget={this.toggleWidget}
          />
          <HelpWidget
            x={810}
            y={10}
            active={widgetHelp}
            toggleWidget={this.toggleWidget}
          />
          <PlayersWidget 
            x = {10}
            y = {200}
            active={widgetPlayers}
            toggleWidget={this.toggleWidget}
            players={players}
          />
          <Nav toggleWidget={this.toggleWidget} />
          {match.params.boardId ? (
            <GridContainer socket={socket} settingActive={widgetSettings} deleteActive={widgetDelete} toggleWidget={this.toggleWidget} update={this.state.update} resetUpdate={this.resetUpdate} fetchUser={fetchUser} />
          ) : (
            <GridContainer create socket={socket} settingActive={widgetSettings} toggleWidget={this.toggleWidget} fetchUser={fetchUser} />
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
