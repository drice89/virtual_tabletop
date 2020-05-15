import React from 'react';
import styles from './game_card.module.scss';
import Status from './status';
import noThumb from '../../images/noThumb.webp';

const GameCard = ({
  game: {
    name, description, backgroundImage, online = 0,
  },
}) => (
  <div className={styles.gameContainer}>
    <div className={styles.card}>
      <Status online={online} />
      <div className={styles.title}>
        <h1>{name}</h1>
        <span>{description}</span>
      </div>
      <div className={styles.cardBack} style={{ backgroundImage: `url(${backgroundImage || noThumb})` }} />
    </div>
  </div>
);

export default GameCard;
