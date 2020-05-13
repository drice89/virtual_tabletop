import React from 'react';
import styles from './user_nav.module.scss';
import buttons from '../buttons.module.scss';

const UserInfo = ({ currentUser, logout }) => {
  if (!currentUser) return null;
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
