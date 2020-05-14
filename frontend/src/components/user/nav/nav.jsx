import React from 'react';
import { Link } from 'react-router-dom';
import styles from './nav.module.scss';
import UserInfoContainer from './user_info_container';

const Nav = () => (
  <div className={styles.nav}>
    <Link to="/">
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
    <UserInfoContainer />
  </div>
);

export default Nav;
