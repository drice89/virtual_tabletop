import React from 'react';
import { Link } from 'react-router-dom';
import styles from './game_card.module.scss';
import Status from './status';
import noThumb from '../../images/noThumb.webp';

const GameCard = ({
  game: {
    _id, name, description, backgroundImage, online = 0,
  },
}) => (
  <div className={styles.gameContainer}>
    {/* <Link to={`/games/${_id}/boards`} className={styles.cardContainer}> */}
    <Link to={`/client/${_id}`} className={styles.cardContainer}>
      <div className={styles.card}>
        <Status online={online} />
        <div className={styles.title}>
          <h1>{name}</h1>
          <span>{description}</span>
        </div>
        <div className={styles.cardBack} style={{ backgroundImage: `url(${backgroundImage || noThumb})` }} />
      </div>
    </Link>
  </div>
);

export default GameCard;
