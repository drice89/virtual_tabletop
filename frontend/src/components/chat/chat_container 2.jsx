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
    const currentMessage = { ...currentUser, body: newMessage, room: params.gameId };
    socket.emit('message', currentMessage);
    createMessage('');
  };

  const renderMessages = messages.map((message) => 
              <li key={`${message.userId}`}>
                <div>
                  <div>
                    <img src={message.profilePicture} alt={message.displayName} />
                  </div>
                  <div>
                    <div>{message.displayName}</div>
                    <div>{message.body}</div>
                  </div>
                </div>
              </li>
              );
            )

  const composeMessage = (
    <>
      <div>
        <textarea rows="2" cols="28" placeholder="Chat Message" onChange={(e) => createMessage(e.currentTarget.value)} value={newMessage} />
      </div>
      <div>
        <button onClick={sendMessage}><i className="ra ra-horn-call" /></button>
      </div>
    </>
  );

  useEffect(() => {
    socket.on('message', (message) => {
      console.log(message);
      const nextState = messages.slice();
      nextState.push(message);
      setMessage(nextState);
    });
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.messageContainer}>
        <ul>
          {
            
          }
        </ul>
      </div>
      <div className={styles.messageComposerContainer}>
        {composeMessage}
      </div>
    </div>
  );
};

export default withRouter(connect(mapStateToProps)(ChatContainer));
