import React from 'react';
import { Link } from 'react-router-dom';
import styles from './nav.module.scss';
import buttons from '../../buttons.module.scss';

const Nav = ({ currentUserId, toggleWidget }) => (
  <div className={styles.nav}>
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
    <button type="button" className={buttons.noneDisabled}>
      <div className={styles.btn}>
        <i className="ra ra-double-team" />
        <span disabled>Players</span>
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
    <button type="button" className={buttons.noneDisabled}>
      <div className={styles.btn}>
        <i className="ra ra-horn-call" />
        <span>Music</span>
      </div>
    </button>
    <button type="button" className={buttons.noneDisabled}>
      <div className={styles.btn}>
        <i className="ra ra-perspective-dice-three" />
        <span>Dice</span>
      </div>
    </button>
  </div>
);

export default Nav;
