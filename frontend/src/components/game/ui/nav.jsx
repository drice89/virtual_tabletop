import React from 'react';
import styles from './nav.module.scss';
import buttons from '../../buttons.module.scss';

const Nav = () => (
  <div className={styles.nav}>
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
    <button type="button" className={buttons.none}>
      <div className={styles.btn}>
        <i className="ra ra-double-team" />
        <span>Players</span>
      </div>
    </button>
    <button type="button" className={buttons.none}>
      <div className={styles.btn}>
        <i className="ra ra-chessboard" />
        <span>Boards</span>
      </div>
    </button>
    <button type="button" className={buttons.none}>
      <div className={styles.btn}>
        <i className="ra ra-speech-bubble" />
        <span>Chat</span>
      </div>
    </button>
    <button type="button" className={buttons.none}>
      <div className={styles.btn}>
        <i className="ra ra-cog" />
        <span>Settings</span>
      </div>
    </button>
    <button type="button" className={buttons.none}>
      <div className={styles.btn}>
        <i className="ra ra-horn-call" />
        <span>Music</span>
      </div>
    </button>
    <button type="button" className={buttons.none}>
      <div className={styles.btn}>
        <i className="ra ra-perspective-dice-three" />
        <span>Dice</span>
      </div>
    </button>
  </div>
);

export default Nav;
