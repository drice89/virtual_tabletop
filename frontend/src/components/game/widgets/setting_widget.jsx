import React from 'react';
import { FiX } from 'react-icons/fi';
import withWidget from '../util/with_widget';
import widgetStyles from './widget.module.scss';
import styles from './setting_widget.module.scss';

let interval = null;

const onButtonHold = (callback) => {
  clearInterval(interval)
  if (callback) {
    interval = setInterval(callback, 20)
  }
}

const SettingWidget = ({ toggleWidget, plusGridWidth, plusGridHeight, plusBackgroundWidth, plusBackgroundHeight, handleLockGrid, handleLockBackground, moveGrid, moveBackground, updateBoard, update, create, handleImageClick, createBoard, rows, cols, borderColor, borderOpacity, myColor, name }) => (
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
        <div>
          Board name
              <input type="text" value={name} onChange={update("name")}/>
        </div>

        <h3>Grid Settings</h3>

        <div className={styles.settingsSection}>
          {create ? <div>
            Rows
            <input onChange={update('row')} id="row" className={styles.gridInputs} type="number" name="" maxLength="2" value={rows ? rows : 2} />
            Cols
            <input onChange={update('col')} id="col" className={styles.gridInputs} type="number" name="" maxLength="2" value={cols ? cols : 2} />
            <button onClick={handleImageClick}>Upload board image</button>
          </div> : null}
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

            <div>
              <div>
                Grid color
              <input type="color" onChange={update('borderColor')} value={borderColor} />
              </div>
              <div>
                Grid opacity
                <input onChange={update('borderOpacity')} type="range" max="1" min="0.01" step="0.01" value={borderOpacity}/>
              </div>
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

      {create ? <button className={styles.updateBoard} onClick={createBoard}>Create board</button> : <button className={styles.updateBoard} onClick={() => updateBoard()}>Update board</button>}
      
    </div>

    <div>
      <h3>User settings</h3>
      <div>
        User color
        <input type="color" onChange={update('myColor')} value={myColor}/>
      </div>
    </div>
  </div>
);

export default SettingWidget;
