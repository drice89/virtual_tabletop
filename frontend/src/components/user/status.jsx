import React from 'react';
import styles from './status.module.scss';

const Status = ({ online }) => (
  <div className={styles.status}>
    {online > 0 ? (
      <>
        <div className={styles.dot}>⬤</div>
        <span>
          {online}
          {' '}
          Online
        </span>
      </>
    ) : (
      <>
        <div className={styles.dot} style={{ color: '#ccc' }}>⬤</div>
        <span>Offline</span>
      </>
    )}

  </div>
);

export default Status;
