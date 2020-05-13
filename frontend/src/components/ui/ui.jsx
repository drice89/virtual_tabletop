import React from 'react';
import styles from './ui.module.scss';

class UI extends React.Component {
  render() {
    return (
      <div className={styles.main}>
        <button className={styles.btn}>123</button>
      </div>
    );
  }
}

export default UI;
