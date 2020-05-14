import React from 'react';
import Nav from './ui/nav';
import Grid from './grid'

import styles from './game.module.scss';


// eslint-disable-next-line react/prefer-stateless-function
class Game extends React.Component {
  render() {
    return (
      <div className={styles.main}>
        <Nav />
        <Grid />
      </div>
    );
  }
}

export default Game;
