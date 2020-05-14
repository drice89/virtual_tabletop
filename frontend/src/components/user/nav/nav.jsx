import React from 'react';
import { Link } from 'react-router-dom';
import styles from './nav.module.scss';
import UserInfo from './user_info';

const Nav = ({ logout, currentUser }) => (
  <div className={styles.nav}>
    <Link to={currentUser ? `/user/${currentUser.id}` : '/login'}>
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
    <UserInfo logout={logout} currentUser={currentUser} />
  </div>
);

export default Nav;
