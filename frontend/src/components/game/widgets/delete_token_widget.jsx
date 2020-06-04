import React from 'react';
import { FiX } from 'react-icons/fi';
import withWidget from '../util/with_widget';
import widgetStyles from './widget.module.scss';
import styles from './setting_widget.module.scss';

const DeleteTokenWidget = ({ toggleWidget }) => (
  <div className={widgetStyles.container}>
    <div className={widgetStyles.header}>
      <div className={widgetStyles.title}>
        <i className="ra ra-guillotine" />
        <h2>Delete Tokens</h2>
      </div>
      <button type="button" className={widgetStyles.close} onClick={() => toggleWidget('widgetDelete')}>
        <FiX />
      </button>
    </div>
    <div className={widgetStyles.content}>
      hahha
    </div>
  </div>
);

export default withWidget(DeleteTokenWidget);
