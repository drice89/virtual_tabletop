import React from 'react';
import { FiX } from 'react-icons/fi';
import withWidget from '../util/with_widget';
import widgetStyles from './widget.module.scss';
import ChatContainer from '../../chat/chat_container';

const ChatWidget = ({ toggleWidget, socket }) => (
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
    <div className={widgetStyles.content}>
      <ChatContainer socket={socket} />
    </div>
  </div>
);

export default withWidget(ChatWidget);
