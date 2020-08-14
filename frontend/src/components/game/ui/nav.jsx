import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './nav.module.scss';
import buttons from '../../buttons.module.scss';

const Nav = ({ currentUserId, toggleWidget, gameId }) => {
  const [copied, setCopied] = useState(false);

  const copyOnClick = () => {
    document.getElementById('share').select();
    document.execCommand('copy');
    // console.log('copied');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={styles.nav}>
      <div className={styles.left}>
        <Link to={currentUserId ? `/user/${currentUserId}` : '/login'}>
          <div className={styles.logoContainer}>
            <div className={styles.logo}>
              <i className="ra ra-hood" />
              <div>
                <p>Virtual</p>
                <p>Tabletop</p>
              </div>
            </div>
            <div className={styles.logoTri} />
          </div>
        </Link>
        <button type="button" className={buttons.none} onClick={() => toggleWidget('widgetPlayers')}>
          <div className={styles.btn}>
            <i className="ra ra-double-team" />
            <span>Players</span>
          </div>
        </button>
        <button type="button" className={buttons.none} onClick={() => toggleWidget('widgetBoards')}>
          <div className={styles.btn}>
            <i className="ra ra-chessboard" />
            <span>Boards</span>
          </div>
        </button>
        <button type="button" className={buttons.none} onClick={() => toggleWidget('widgetChat')}>
          <div className={styles.btn}>
            <i className="ra ra-speech-bubble" />
            <span>Chat</span>
          </div>
        </button>
        <button type="button" className={buttons.none} onClick={() => toggleWidget('widgetSettings')}>
          <div className={styles.btn}>
            <i className="ra ra-cog" />
            <span>Settings</span>
          </div>
        </button>
        {/* <button type="button" className={buttons.noneDisabled}>
          <div className={styles.btn}>
            <i className="ra ra-horn-call" />
            <span>Music</span>
          </div>
        </button> */}
        {/* <button type="button" className={buttons.noneDisabled}>
          <div className={styles.btn}>
            <i className="ra ra-perspective-dice-three" />
            <span>Dice</span>
          </div>
        </button> */}
        <button type="button" className={buttons.none} onClick={() => toggleWidget('widgetHelp')}>
          <div className={styles.btn}>
            <i className="ra ra-help" />
            <span>Help</span>
          </div>
        </button>
      </div>
      <div className={`${styles.share}`} onClick={copyOnClick}>
        <div className={styles.shareTri} />
        <div className={styles.shareInfo}>
          <button type="button">
            <i className="ra ra-quill-ink" />
            <span>Share</span>
          </button>
          <input id="share" type="text" value={gameId} readOnly="readonly" size="25" />
          <span className={`${styles.tooltip} ${copied && styles.gold}`}>
            {!copied ? 'Click to copy to clipboard' : 'Copied to clipboard!'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Nav;
