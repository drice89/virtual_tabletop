import React from 'react';
import { FiX } from 'react-icons/fi';
import withWidget from '../util/with_widget';
import widgetStyles from './widget.module.scss';
import styles from './setting_widget.module.scss';

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
      <div>
        <h3>Grid Settings</h3>
        
        <div className={styles.settingsSection}>
         <div>
            <div>
              Width
            <button className={styles.plusMinusButton}>-</button>
              <button className={styles.plusMinusButton}>+</button>
            </div>

            <div>
              Height
            <button className={styles.plusMinusButton}>-</button>
              <button className={styles.plusMinusButton}>+</button>
            </div>
         </div>

          <button className={styles.unlockButton}>Unlock grid</button>
        </div>

      </div>

      <div>
        <h3>Background Settings</h3>

        <div className={styles.settingsSection}>
          <div>
            <div>
              Width
            <button className={styles.plusMinusButton}>-</button>
              <button className={styles.plusMinusButton}>+</button>
            </div>

            <div>
              Height
            <button className={styles.plusMinusButton}>-</button>
              <button className={styles.plusMinusButton}>+</button>
            </div>
          </div>

          <button className={styles.unlockButton}>Unlock background</button>
        </div>

      </div>
    </div>
  </div>
);

export default SettingWidget;
