import React from 'react';
import { FiX } from 'react-icons/fi';
import withWidget from '../util/with_widget';
import widgetStyles from './widget.module.scss';

const SettingWidget = ({ toggleWidget }) => (
  <div className={widgetStyles.container}>
    <div className={widgetStyles.header}>
      <div className={widgetStyles.title}>
        <i className="ra ra-cog" />
        <h2>Settings</h2>
      </div>
      <button type="button" className={widgetStyles.close} onClick={() => toggleWidget('widgetSettings')}>
        <FiX />
      </button>
    </div>
    <div className={widgetStyles.content}>
      test
    </div>
  </div>
);

export default SettingWidget;
