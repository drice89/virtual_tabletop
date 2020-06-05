import React from 'react';
import { FiX } from 'react-icons/fi';
import withWidget from '../util/with_widget';
import widgetStyles from './widget.module.scss';
import styles from './setting_widget.module.scss';

let interval = null;

const onButtonHold = (callback) => {
  clearInterval(interval)
  if(callback){
    interval = setInterval(callback, 20)
  }
}

const SettingWidget = ({ toggleWidget, plusGridWidth, plusGridHeight, plusBackgroundWidth, plusBackgroundHeight, handleLockGrid, handleLockBackground, moveGrid, moveBackground, updateBoard }) => (
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
            <button className={`${styles.plusMinusButton} ${moveGrid ? styles.active : styles.disabled}`} onMouseDown={() => onButtonHold(() => moveGrid ? plusGridWidth(1) : null)} onMouseUp={() => clearInterval(interval)} onMouseOut={() => clearInterval(interval)}>-</button>
              <button className={`${styles.plusMinusButton} ${moveGrid ? styles.active : styles.disabled}`} onMouseDown={() => onButtonHold(() => moveGrid ? plusGridWidth(-1) : null)} onMouseUp={() => clearInterval(interval)} onMouseOut={() => clearInterval(interval)}>+</button>
            </div>

            <div>
              Height
            <button className={`${styles.plusMinusButton} ${moveGrid ? styles.active : styles.disabled}`} onMouseDown={() => onButtonHold(() => moveGrid ? plusGridHeight(1) : null)} onMouseUp={() => clearInterval(interval)} onMouseOut={() => clearInterval(interval)}>-</button>
              <button className={`${styles.plusMinusButton} ${moveGrid ? styles.active : styles.disabled}`} onMouseDown={() => onButtonHold(() => moveGrid ? plusGridHeight(-1) : null)} onMouseUp={() => clearInterval(interval)} onMouseOut={() => clearInterval(interval)}>+</button>
            </div>
         </div>

          <button className={styles.unlockButton} onClick={() => handleLockGrid()}>{moveGrid ? "Lock grid" : "Unlock grid"}</button>
        </div>

      </div>

      <div>
        <h3>Background Settings</h3>

        <div className={styles.settingsSection}>
          <div>
            <div>
              Width
            <button className={`${styles.plusMinusButton} ${moveBackground ? styles.active : styles.disabled}`} onMouseDown={() => onButtonHold(() => moveBackground ? plusBackgroundWidth(1) : null)} onMouseUp={() => clearInterval(interval)} onMouseOut={() => clearInterval(interval)}>-</button>
              <button className={`${styles.plusMinusButton} ${moveBackground ? styles.active : styles.disabled}`} onMouseDown={() => onButtonHold(() => moveBackground ? plusBackgroundWidth(-1) : null)} onMouseUp={() => clearInterval(interval)} onMouseOut={() => clearInterval(interval)}>+</button>
            </div>

            <div>
              Height
            <button className={`${styles.plusMinusButton} ${moveBackground ? styles.active : styles.disabled}`} onMouseDown={() => onButtonHold(() => moveBackground ? plusBackgroundHeight(1) : null)} onMouseUp={() => clearInterval(interval)} onMouseOut={() => clearInterval(interval)}>-</button>
              <button className={`${styles.plusMinusButton} ${moveBackground ? styles.active : styles.disabled}`} onMouseDown={() => onButtonHold(() => moveBackground ? plusBackgroundHeight(-1) : null)} onMouseUp={() => clearInterval(interval)} onMouseOut={() => clearInterval(interval)}>+</button>
            </div>
          </div>

          <button className={styles.unlockButton} onClick={() => handleLockBackground()}>{moveBackground ? "Lock background" : "Unlock background"}</button>
        </div>

      </div>

      <button className={styles.updateBoard} onClick={()=> updateBoard()}>UPDATE BOARD</button>
    </div>
  </div>
);

export default SettingWidget;
