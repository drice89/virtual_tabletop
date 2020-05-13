import React from 'react';
import styles from './user_nav.module.scss';
import buttons from '../buttons.module.scss';
import { AuthRoute, ProtectedRoute } from '../../util/route_util';
import UserInfoContainer from './user_info_container';

const UserNav = () => (
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
        <i className="ra ra-castle-emblem" />
        <span>Home</span>
      </div>
    </button>
    <button type="button" className={buttons.none}>
      <div className={styles.btn}>
        <i className="ra ra-scroll-unfurled" />
        <span>Sign Up</span>
      </div>
    </button>
    <button type="button" className={buttons.none}>
      <div className={styles.btn}>
        <i className="ra ra-key" />
        <span>Login</span>
      </div>
    </button>
    <UserInfoContainer />
  </div>
);

export default UserNav;
