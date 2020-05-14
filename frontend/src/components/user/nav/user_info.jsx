import React from 'react';
import { Link } from 'react-router-dom';
import styles from './nav.module.scss';
import buttons from '../../buttons.module.scss';

const UserInfo = ({ currentUser, logout }) => {
  if (!currentUser) {
    return (
      <div className={styles.userInfo}>
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
      </div>
    );
  }
  return (
    <div className={styles.userInfo}>
      <span>
        Hello,
        {currentUser.displayName}
      </span>
      <button type="button" className={buttons.none} onClick={logout}>
        <div className={styles.btn}>
          <i className="ra ra-footprint" />
          <span>Logout</span>
        </div>
      </button>
    </div>
  );
};

export default UserInfo;
