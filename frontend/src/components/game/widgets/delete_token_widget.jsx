import React from 'react';
import { FiX } from 'react-icons/fi';
import withWidget from '../util/with_widget';
import widgetStyles from './widget.module.scss';
import DeleteTokenWindow from './delete_token_window';
import styles from './delete_token_widget.module.scss';

const DeleteTokenWidget = ({ toggleWidget, socket, tokens, highlightToken, userId }) => (
  <div className={widgetStyles.container}>
    <div className={widgetStyles.header}>
      <div className={widgetStyles.title}>
        <i className="ra ra-guillotine" />
        <h2>Manage Tokens</h2>
      </div>
      <button type="button" className={widgetStyles.close} onClick={() => toggleWidget('widgetDelete')}>
        <FiX />
      </button>
    </div>
    <div className={widgetStyles.content}>
      <DeleteTokenWindow socket={socket} tokens={tokens} highlightToken={highlightToken} userId={userId}/>
    </div>
  </div>
);

export default withWidget(DeleteTokenWidget);
