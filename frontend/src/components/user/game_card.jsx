import React from 'react';
import { Link } from 'react-router-dom';
import { FiChevronDown, FiTrash2, FiEdit3 } from 'react-icons/fi';
import styles from './game_card.module.scss';
import Status from './status';
import noThumb from '../../images/noThumb.webp';

const GameCard = ({
  game: {
    _id, name, description, backgroundImage, online = 0,
  },
  handleDelete,
  setEditForm,
  sessionId,
  index,
}) => (
  <div className={styles.gameContainer}>
    {/* <Link to={`/games/${_id}/boards`} className={styles.cardContainer}> */}
    <Link to={`/client/${_id}`} className={styles.cardContainer}>
      <div className={`${styles.card} ${index === 0 && sessionId === "5ed54482eeff2c558c8a7ce2" ? styles.highlighted : ""}`}>
        <Status online={online} />
        <div className={styles.title}>
          <h1>{name}</h1>
          <span>{description}</span>
        </div>
        <div className={styles.cardBack} style={{ backgroundImage: `url(${backgroundImage || noThumb})` }} />
      </div>
    </Link>
    <div className={styles.dropdown}>
      <button type="button" className={styles.dropdownbtn}>
        <FiChevronDown />
      </button>
      <div className={styles.dropdowncontent}>
        <button type="button" onClick={() => setEditForm(_id)}>
          <FiEdit3 />
          Edit
        </button>
        <button type="button" onClick={handleDelete(_id)}>
          <FiTrash2 />
          Delete
        </button>
      </div>
    </div>
  </div>
);

export default GameCard;
