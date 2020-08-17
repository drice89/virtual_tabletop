import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styles from './chat.module.scss';

const mapStateToProps = (state) => ({
  currentUser: state.entities.users[state.session.userId],
});

// messages and setMessages are now on the client component because messages are being stored in state there, it was lifted up
const ChatContainer = ({ match: { params }, currentUser, socket, messages, setMessage }) => {
  // use state hook. New message = state, createMessage used to update state
  // messages, setMessages still have the same effect
  const [newMessage, createMessage] = useState('');
  //const [messages, setMessage] = useState([]);
  
  const sendMessage = () => {
    const time = new Date();
    const currentMessage = {
      displayName: currentUser.displayName,
      profilePicture: currentUser.profilePicture,
      body: newMessage.trim(),
      room: params.gameId,
      timeStamp: time.toLocaleTimeString('en-US'),
    };
    if (currentMessage.body.length !== 0) {
      socket.emit('message', currentMessage);
    }
    createMessage('');
  };


  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      sendMessage();
    }
  };

  const renderMessages = messages.map((message, i) => (
    <li key={`${message.timeStamp}+${message.displayName}+${i}`} className={styles.message}>
      <div className={styles.profileImg} style={{ backgroundImage: `url(${message.profilePicture})` }} />
      <div className={styles.messageBody}>
        <div>
          <span className={styles.name}>{message.displayName}</span>
          <span className={styles.time}>{message.timeStamp}</span>
        </div>
        <p>{message.body}</p>
      </div>
    </li>
  ));

  const composeMessage = (
    <>
      <div className={styles.textAreaWrapper}>
        <textarea
          rows="1"
          placeholder="Chat Message"
          onKeyDown={(e) => handleKeyDown(e)}
          onChange={(e) => createMessage(e.currentTarget.value)}
          value={newMessage}
          draggable
          onDragStart={(e) => {
            if (e.target.type === 'textarea') e.preventDefault();
          }}
        />
      </div>
      <div>
        <button onClick={sendMessage}><i className="ra ra-horn-call" /></button>
      </div>
    </>
  );

  // use effect hook here to mount the websocket and unmount it when messages is updated so it doesnt subscribe multiple times
  useEffect(() => {
    // when it recieves a message through the socket, it posts the message to the next state, creating a shallow dup of messages,
    // adding the new messages and then updating the client component through "setMessages" which was handed down in props
    socket.on('message', (message) => {
      const nextState = messages.slice();
      nextState.push(message);
      setMessage(nextState);
    });
    return () => socket.off('message');
  }, [messages]);

  return (
    <div className={styles.wrapper}>
      <ul className={styles.messageContainer}>
        {renderMessages}
      </ul>
      <div className={styles.messageComposerContainer}>
        {composeMessage}
      </div>
    </div>
  );
};

export default withRouter(connect(mapStateToProps)(ChatContainer));
