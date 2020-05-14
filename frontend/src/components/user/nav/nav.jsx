import React from 'react';
import { Link } from 'react-router-dom';
import styles from './nav.module.scss';
import buttons from '../../buttons.module.scss';
import UserInfoContainer from './user_info_container';

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
    <Link to="/">
      <button type="button" className={buttons.none}>
        <div className={styles.btn}>
          <i className="ra ra-castle-emblem" />
          <span>Home</span>
        </div>
      </button>
    </Link>
    <Link to="/signup">
      <button type="button" className={buttons.none}>
        <div className={styles.btn}>
          <i className="ra ra-scroll-unfurled" />
          <span>Sign Up</span>
        </div>
      </button>
    </Link>
    <Link to="/login">
      <button type="button" className={buttons.none}>
        <div className={styles.btn}>
          <i className="ra ra-key" />
          <span>Login</span>
        </div>
      </button>
    </Link>
    <UserInfoContainer />
  </div>
);

export default Nav;
