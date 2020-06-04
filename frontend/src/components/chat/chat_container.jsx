import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styles from './chat.module.scss';

const mapStateToProps = (state) => ({
  currentUser: state.entities.users[state.session.userId],
});

const ChatContainer = ({ match: { params }, currentUser, socket }) => {
  const [messages, setMessage] = useState([]);
  const [newMessage, createMessage] = useState('');

  const addMessage = (message) => {
    const nextState = messages;
    nextState.push(message);
    setMessage(nextState);
  };

  const sendMessage = () => {
    const currentMessage = { ...currentUser, body: newMessage, room: params.gameId };
    socket.emit('message', currentMessage);
  };

  const renderMessages = messages.map((message, idx) => (
    <div key={`${idx}+${message.userId}`}>
      <div>
        <div>
          <img src={message.profilePicture} alt={message.displayName} />
        </div>
        <div>
          <div>{message.displayName}</div>
          <div>{message.body}</div>
        </div>
      </div>
    </div>
  ));

  const composeMessage = (
    <>
      <div>
        <textarea rows="1" cols="30" onChange={(e) => createMessage(e.currentTarget.value)}>text</textarea>
      </div>
      <div>
        <button onClick={sendMessage}>Send</button>
      </div>
    </>
  );

  useEffect(() => {
    socket.on('message', (message) => addMessage(message));
  }, [messages]);

  return (
    <div className={styles.chatContainer}>
      <div className={styles.wrapper}>
        <div>
          <h3>Chat</h3>
        </div>
        <div className={styles.messageContainer}>
          {renderMessages}
        </div>
        <div className={styles.messageComposerContainer}>
          {composeMessage}
        </div>
      </div>
    </div>
  );
};

withRouter(connect(mapStateToProps)(ChatContainer));
