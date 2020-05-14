import React from 'react';
import styles from './game_card.module.scss';
import Status from './status';

const GameCard = ({
  game: {
    title, description, thumb, online,
  },
}) => (
  <div className={styles.gameContainer}>
    <div className={styles.card}>
      <Status online={online} />
      <div className={styles.title}>
        <h1>{title}</h1>
        <span>{description}</span>
      </div>
      <div className={styles.cardBack} style={{ backgroundImage: `url(${thumb})` }} />
    </div>
  </div>
);

export default GameCard;
