import React from 'react';
import styles from './user_show.module.scss';

// eslint-disable-next-line react/prefer-stateless-function
class UserShow extends React.Component {
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.background}>
          <div className={styles.test}>lorem1000</div>
        </div>
      </div>
    );
  }
}

export default UserShow;
