import React from 'react';
import {
  FiX, FiLock, FiUnlock, FiMinus, FiPlus,
} from 'react-icons/fi';
import buttons from '../../buttons.module.scss';
import withWidget from '../util/with_widget';
import widgetStyles from './widget.module.scss';
import styles from './setting_widget.module.scss';

let interval = null;

const onButtonHold = (callback) => {
  clearInterval(interval);
  if (callback) {
    interval = setInterval(callback, 20);
  }
};

const SettingWidget = ({
  toggleWidget, plusGridWidth, plusGridHeight, plusBackgroundWidth, plusBackgroundHeight, handleLockGrid, handleLockBackground, moveGrid, moveBackground, updateBoard, update, create, handleImageClick, createBoard, rows, cols, borderColor, borderOpacity, myColor, name, lockAll, previewUrl, boardBackground,
}) => (
  <div className={widgetStyles.container}>
    <div className={widgetStyles.header}>
      <div className={widgetStyles.title}>
        <i className="ra ra-cog" />
        <h2>Settings</h2>
      </div>
      <button type="button" className={widgetStyles.close} onClick={() => { toggleWidget('widgetSettings'); lockAll(); }}>
        <FiX />
      </button>
    </div>
    <div className={widgetStyles.content}>
      <div className={boardBackground || previewUrl ? styles.container : `${styles.disableAll} ${styles.container}`}>
        <section id={styles.test} className={styles.settingsNone}>
          <div className={styles.row}>
            <div className={styles.label}>
              Name
            </div>
            <input
              className={styles.boardInput}
              type="text"
              value={name}
              onChange={update('name')}
              draggable
              onDragStart={(e) => {
                if (e.target.type === 'text') e.preventDefault();
              }}
            />
          </div>
          {create ? (
            <div className={styles.row}>
              <button type="button" onClick={handleImageClick} className={`test ${buttons.gold} ${buttons.secondary} ${buttons.secondarySmall}`}>Upload Board Image</button>
            </div>
          ) : null}
        </section>
        <section className={styles.settings}>
          <h3>Grid Settings</h3>
          {create ? (
            <>
              <div className={styles.row}>
                <div className={styles.label}>
                  Rows
                </div>
                <input
                  onChange={update('row')}
                  id="row"
                  className={styles.gridInputs}
                  type="number"
                  name=""
                  maxLength="2"
                  value={rows || 2}
                  draggable
                  onDragStart={(e) => {
                    if (e.target.type === 'number') e.preventDefault();
                  }}
                />
              </div>
              <div className={styles.row}>
                <div className={styles.label}>
                  Columns
                </div>
                <input
                  onChange={update('col')}
                  id="col"
                  className={styles.gridInputs}
                  type="number"
                  name=""
                  maxLength="2"
                  value={cols || 2}
                  draggable
                  onDragStart={(e) => {
                    if (e.target.type === 'number') e.preventDefault();
                  }}
                />
              </div>
            </>
          ) : null}

          <div className={styles.row}>
            <div className={styles.label}>
              <div className={styles.tooltip}>
                <button type="button" className={styles.lock} onClick={() => handleLockGrid()}>
                  {moveGrid ? <FiUnlock /> : <FiLock className={styles.locked} />}
                </button>
                <span className={styles.tooltiptext}>Unlock to drag positioning of the grid, or mousewheel to resize</span>
              </div>
            </div>
            <div className={moveGrid ? styles.data : `${styles.dataDisabled} ${styles.data}`}>
              <div className={styles.buttonRow}>
                <span className={styles.labelText}>
                  Width
                </span>
                <button className={`${styles.plusMinusButton} ${moveGrid ? styles.active : styles.disabled}`} onMouseDown={() => onButtonHold(() => (moveGrid ? plusGridWidth(1) : null))} onMouseUp={() => clearInterval(interval)} onMouseOut={() => clearInterval(interval)}><FiMinus /></button>
                <button className={`${styles.plusMinusButton} ${moveGrid ? styles.active : styles.disabled}`} onMouseDown={() => onButtonHold(() => (moveGrid ? plusGridWidth(-1) : null))} onMouseUp={() => clearInterval(interval)} onMouseOut={() => clearInterval(interval)}><FiPlus /></button>
              </div>

              <div className={styles.buttonRow}>
                <span className={styles.labelText}>
                  Height
                </span>
                <button className={`${styles.plusMinusButton} ${moveGrid ? styles.active : styles.disabled}`} onMouseDown={() => onButtonHold(() => (moveGrid ? plusGridHeight(1) : null))} onMouseUp={() => clearInterval(interval)} onMouseOut={() => clearInterval(interval)}><FiMinus /></button>
                <button className={`${styles.plusMinusButton} ${moveGrid ? styles.active : styles.disabled}`} onMouseDown={() => onButtonHold(() => (moveGrid ? plusGridHeight(-1) : null))} onMouseUp={() => clearInterval(interval)} onMouseOut={() => clearInterval(interval)}><FiPlus /></button>
              </div>
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.label}>
              Color
            </div>
            <input type="color" onChange={update('borderColor')} value={borderColor} />
          </div>
          <div className={styles.row}>
            <div className={styles.label}>
              Opacity
            </div>
            <input
              onChange={update('borderOpacity')}
              className={styles.rangeInput}
              type="range"
              max="1"
              min="0.01"
              step="0.01"
              value={borderOpacity}
              draggable
              onDragStart={(e) => {
                if (e.target.type === 'range') e.preventDefault();
              }}
            />
          </div>
        </section>
        <section className={styles.settings}>
          <h3>Background Settings</h3>
          <div className={styles.row}>
            <div className={styles.label}>
              <div className={styles.tooltip}>
                <button type="button" className={styles.lock} onClick={() => handleLockBackground()}>
                  {moveBackground ? <FiUnlock /> : <FiLock className={styles.locked} />}
                </button>
                <span className={styles.tooltiptext}>Unlock to drag positioning of the background, or mousewheel to resize</span>
              </div>
            </div>
            <div className={moveBackground ? styles.data : `${styles.dataDisabled} ${styles.data}`}>
              <div className={styles.buttonRow}>
                <span className={styles.labelText}>
                  Width
                </span>
                <button className={`${styles.plusMinusButton} ${moveBackground ? styles.active : styles.disabled}`} onMouseDown={() => onButtonHold(() => (moveBackground ? plusBackgroundWidth(1) : null))} onMouseUp={() => clearInterval(interval)} onMouseOut={() => clearInterval(interval)}><FiMinus /></button>
                <button className={`${styles.plusMinusButton} ${moveBackground ? styles.active : styles.disabled}`} onMouseDown={() => onButtonHold(() => (moveBackground ? plusBackgroundWidth(-1) : null))} onMouseUp={() => clearInterval(interval)} onMouseOut={() => clearInterval(interval)}><FiPlus /></button>
              </div>

              <div className={styles.buttonRow}>
                <span className={styles.labelText}>
                  Height
                </span>
                <button className={`${styles.plusMinusButton} ${moveBackground ? styles.active : styles.disabled}`} onMouseDown={() => onButtonHold(() => (moveBackground ? plusBackgroundHeight(1) : null))} onMouseUp={() => clearInterval(interval)} onMouseOut={() => clearInterval(interval)}><FiMinus /></button>
                <button className={`${styles.plusMinusButton} ${moveBackground ? styles.active : styles.disabled}`} onMouseDown={() => onButtonHold(() => (moveBackground ? plusBackgroundHeight(-1) : null))} onMouseUp={() => clearInterval(interval)} onMouseOut={() => clearInterval(interval)}><FiPlus /></button>
              </div>
            </div>
          </div>
        </section>
        {!create ? <UserSetting update={update} myColor={myColor} /> : null}
        <section className={styles.settingsNone}>
          <div className={styles.row}>
            {create ? (
              <button className={`${buttons.secondary} ${buttons.secondarySmall}`} onClick={createBoard}>Create board</button>
            ) : (
              <button className={`${buttons.secondary} ${buttons.secondarySmall}`} onClick={() => updateBoard()}>Update board</button>
            )}
          </div>
        </section>
      </div>
    </div>
  </div>
);

const UserSetting = ({ update, myColor }) => (
  <section className={styles.settings}>
    <h3>User settings</h3>
    <div className={styles.row}>
      <div className={styles.label}>
        User color
      </div>
      {myColor ? <input type="color" onChange={update('myColor')} value={myColor} /> : null}
    </div>
  </section>
);

export default SettingWidget;
