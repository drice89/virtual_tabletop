import React from 'react';
import { FiX } from 'react-icons/fi';
import withWidget from '../util/with_widget';
import widgetStyles from './widget.module.scss';
import ChatContainer from '../../chat/chat_container';

// socket is passed down from the client
const ChatWidget = ({ toggleWidget, socket, setMessage, messages }) => (
  <div className={widgetStyles.container}>
    <div className={widgetStyles.header}>
      <div className={widgetStyles.title}>
        <i className="ra ra-speech-bubble" />
        <h2>Chat</h2>
      </div>
      <button type="button" className={widgetStyles.close} onClick={() => toggleWidget('widgetChat')}>
        <FiX />
      </button>
    </div>
    <div className={widgetStyles.content} style={{ minHeight: '160px', height: '160px' }}>
      <ChatContainer setMessage={setMessage} messages={messages} socket={socket} />
    </div>
  </div>
);

export default withWidget(ChatWidget);
