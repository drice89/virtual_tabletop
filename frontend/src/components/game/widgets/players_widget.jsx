import React from 'react';
import { FiX } from 'react-icons/fi';
import withWidget from '../util/with_widget';
import widgetStyles from './widget.module.scss';
import styles from './players_widget.module.scss';

const PlayersWidget = ({ toggleWidget, players }) => (
  <div className={widgetStyles.container}>
    <div className={widgetStyles.header}>
      <div className={widgetStyles.title}>
        <i className="ra ra-double-team" />
        <h2>Players</h2>
      </div>
      <button type="button" className={widgetStyles.close} onClick={() => toggleWidget('widgetPlayers')}>
        <FiX />
      </button>
    </div>
    <div className={widgetStyles.content}>
      <ul className={styles.players}>
        {
          players.map((el) => (
            <li key={`players-${el._id}`}>
              <img src={el.profilePicture} alt={el.displayName} />
              <span>{el.displayName}</span>
            </li>
          ))
        }
      </ul>
    </div>
  </div>
);

export default withWidget(PlayersWidget);
