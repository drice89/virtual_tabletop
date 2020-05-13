import React from 'react';
import Nav from './nav';
import styles from './ui.module.scss';

// eslint-disable-next-line react/prefer-stateless-function
class UI extends React.Component {
  render() {
    return (
      <div className={styles.main}>
        <Nav />
        123
      </div>
    );
  }
}

export default UI;
