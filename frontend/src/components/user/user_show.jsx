import React from 'react';
import map from '../../images/battlemap.jpg';
import snow from '../../images/snow_landscape.jpg';
import styles from './user_show.module.scss';
import buttons from '../buttons.module.scss';

// eslint-disable-next-line react/prefer-stateless-function
class UserShow extends React.Component {
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.background}>
          <div className={styles.contentContainer}>
            <div className={styles.profile}>
              <img className={styles.profileImg} src="https://via.placeholder.com/150/000000" alt="" />
              <div>
                <h1>Username</h1>
                <span>Level 7 Novice</span>
              </div>
              <div className={styles.stats}>
                <div>
                  <h1>2</h1>
                  Created Games
                </div>
                <div>
                  <h1>5</h1>
                  Joined Games
                </div>
              </div>
            </div>
            <div className={styles.content}>
              <div className={styles.topBar}>
                <h2>My Games</h2>
                <div>
                  <button type="button" className={`${buttons.secondary} ${buttons.btnIcon}`}>
                    <i className="ra ra-anvil ra-lg" />
                    <span>
                      Create New Game
                    </span>
                  </button>
                </div>
              </div>
              <section className={styles.main}>
                <div className={styles.gameContainer}>
                  <div className={styles.card}>
                    <div className={styles.status}>
                      <div className={styles.dot}>⬤</div>
                      <span>4 Online</span>
                    </div>
                    <div className={styles.title}>
                      <h1>Wayne's World</h1>
                      <span>The example description of Wayne's World</span>
                    </div>
                    <div className={styles.cardBack} style={{ backgroundImage: `url(${snow})` }} />
                  </div>
                </div>
                {/* <img src={map} alt=""/> */}
                <div className={styles.gameContainer}>
                  <div className={styles.card} style={{}}>
                    <div className={styles.status}>
                      <div className={styles.dot} style={{ color: '#ccc' }}>⬤</div>
                      <span>Offline</span>
                    </div>
                    <div className={styles.title}>
                      <h1>Dillon's World</h1>
                      <span>The example description of Dillon's World</span>
                    </div>
                    <div className={styles.cardBack} style={{ backgroundImage: `url(${map})` }} />
                  </div>
                </div>
                <div className={styles.gameContainer}>
                  <div className={styles.card} style={{}}>
                    <div className={styles.status}>
                      <div className={styles.dot} style={{ color: '#ccc' }}>⬤</div>
                      <span>Offline</span>
                    </div>
                    <div className={styles.title}>
                      <h1>Dillon's World</h1>
                      <span>The example description of Dillon's World</span>
                    </div>
                    <div className={styles.cardBack} style={{ backgroundImage: `url(${map})` }} />
                  </div>
                </div>
                <div className={styles.gameContainer}>
                  <div className={styles.card} style={{}}>
                    <div className={styles.status}>
                      <div className={styles.dot} style={{ color: '#ccc' }}>⬤</div>
                      <span>Offline</span>
                    </div>
                    <div className={styles.title}>
                      <h1>Dillon's World</h1>
                      <span>The example description of Dillon's World</span>
                    </div>
                    <div className={styles.cardBack} style={{ backgroundImage: `url(${map})` }} />
                  </div>
                </div>
                <div className={styles.gameContainer}>
                  <div className={styles.card} style={{}}>
                    <div className={styles.status}>
                      <div className={styles.dot} style={{ color: '#ccc' }}>⬤</div>
                      <span>Offline</span>
                    </div>
                    <div className={styles.title}>
                      <h1>Dillon's World</h1>
                      <span>The example description of Dillon's World</span>
                    </div>
                    <div className={styles.cardBack} style={{ backgroundImage: `url(${map})` }} />
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserShow;
