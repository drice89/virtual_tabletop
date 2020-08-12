import React from "react"
import withWidget from "../util/with_widget"
import widgetStyles from './widget.module.scss';
import { FiX } from 'react-icons/fi';

const PlayersWidget = ({toggleWidget, players}) => (
  <div className={widgetStyles.container}>
    <div className={widgetStyles.header}>
      <div className={widgetStyles.title}>
        <i className="ra ra-help" />
        <h2>Players</h2>
      </div>
      <button type="button" className={widgetStyles.close} onClick={() => toggleWidget('widgetPlayers')}>
        <FiX />
      </button>
    </div>
    <div className={widgetStyles.content}>
      <ul className={widgetStyles.players}>
        {
          players.map(el => {
            return (
              <li>
                <img src={el.profilePicture}></img><span>{el.displayName}</span>
              </li>
            )
          })
        }
      </ul>
    </div>
  </div>
);

export default withWidget(PlayersWidget);