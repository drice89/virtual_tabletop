import React, { useState } from 'react';
import { FiPlus, FiMinus } from 'react-icons/fi';
import styles from './help.module.scss';
import * as HelpUtil from './help_util';

const HelpContainer = () => {
  const [activeItem, setActiveItem] = useState('');

  const handleClick = (tab) => {
    if (tab === activeItem) {
      tab = null;
    }
    setActiveItem(tab);
  };

  const displayHelpText = (component) => (
    <>
      {component}
    </>
  );
  return (
    <div>
      <ul className={styles.topicHeader}>
        <li className={activeItem === 'about' ? styles.active : ''} onClick={() => handleClick('about')}>
          {activeItem === 'about' ? <FiMinus /> : <FiPlus />}
          About
        </li>
        { activeItem === 'about' ? displayHelpText(HelpUtil.howToPlayHelp) : null}
        <li className={activeItem === 'create-board' ? styles.active : ''} onClick={() => handleClick('create-board')}>
          {activeItem === 'create-board' ? <FiMinus /> : <FiPlus />}
          Create and edit boards
        </li>
        { activeItem === 'create-board' ? displayHelpText(HelpUtil.createBoardHelp) : null}
        <li className={activeItem === 'pieces' ? styles.active : ''} onClick={() => handleClick('pieces')}>
          {activeItem === 'pieces' ? <FiMinus /> : <FiPlus />}
          Adding and moving pieces
        </li>
        { activeItem === 'pieces' ? displayHelpText(HelpUtil.piecesHelp) : null }
        <li className={activeItem === 'chat' ? styles.active : ''} onClick={() => handleClick('chat')}>
          {activeItem === 'chat' ? <FiMinus /> : <FiPlus />}
          Chat
        </li>
        { activeItem === 'chat' ? displayHelpText(HelpUtil.chatHelp) : null}
        <li className={activeItem === 'invite-players' ? styles.active : ''} onClick={() => handleClick('invite-players')}>
          {activeItem === 'invite-players' ? <FiMinus /> : <FiPlus />}
          Invite Players
        </li>
        { activeItem === 'invite-players' ? displayHelpText(HelpUtil.inviteHelp) : null}
      </ul>
    </div>
  );
};

export default HelpContainer;
