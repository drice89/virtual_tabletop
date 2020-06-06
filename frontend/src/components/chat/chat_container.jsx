import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styles from './chat.module.scss';

const mapStateToProps = (state) => ({
  currentUser: state.entities.users[state.session.userId],
});

const ChatContainer = ({ match: { params }, currentUser, socket }) => {
  const [newMessage, createMessage] = useState('');
  const [messages, setMessage] = useState([]);

  const sendMessage = () => {
    const time = new Date();
    const currentMessage = {
      displayName: currentUser.displayName,
      profilePicture: currentUser.profilePicture,
      body: newMessage,
      room: params.gameId,
      timeStamp: time.toLocaleTimeString('en-US'),
    };
    socket.emit('message', currentMessage);
    createMessage('');
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      sendMessage();
    }
  };

  const renderMessages = messages.map((message, i) => (
    <li key={`${message.timeStamp}+${message.displayName}+${i}`}>
      <div className={styles.messageDisplayWrapper}>
        <div>
          <img src={message.profilePicture} alt={message.displayName} />
        </div>
        <div className="messageBodyWrapper">
          <div>
            <span>{message.displayName}</span>
            <span className={styles.timeStamp}>{message.timeStamp}</span>
          </div>
          <div>{message.body}</div>
        </div>
      </div>
    </li>
  ));

  const composeMessage = (
    <>
      <div className={styles.textAreaWrapper}>
        <textarea rows="2" placeholder="Chat Message" onKeyDown={(e) => handleKeyDown(e)} onChange={(e) => createMessage(e.currentTarget.value)} value={newMessage} />
      </div>
      <div>
        <button onClick={sendMessage}><i className="ra ra-horn-call" /></button>
      </div>
    </>
  );

  useEffect(() => {
    socket.on('message', (message) => {
      const nextState = messages.slice();
      nextState.push(message);
      setMessage(nextState);
    });
    return () => socket.off('message');
  }, [messages]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.messageContainer}>
        <ul>
          {renderMessages}
        </ul>
      </div>
      <div className={styles.messageComposerContainer}>
        {composeMessage}
      </div>
    </div>
  );
};

export default withRouter(connect(mapStateToProps)(ChatContainer));
