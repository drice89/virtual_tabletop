import React from 'react';
import Carousel from './carousel';
import styles from './content.module.scss';
import heroImage1 from '../../images/heroimage1.png';

const Content = () => (
  <>
    <div className={styles.carouselWindow}>
      <header>
        <div className={styles.hero}>
          <h1>Virtual</h1>
          <h1>Tabletop</h1>
          <h2>Welcome to the Heart of Perfect Gaming</h2>
        </div>
      </header>

      <div className={styles.header}>
        <Carousel />
      </div>
    </div>

    <main className={`${styles.background} ${styles.main}`}>
      <div className={styles.hookBox}>
        <section>
          <div>
            <div className={styles.hook}>
              Get Ready for the next evolution of tabletop gaming.
              With Virtual TableTop you will experience immersive board gaming
              like never before!
            </div>
            <div className={styles.hookBody}>
              Our easy to use, yet fully customizable interface lets you take charge
              of the action. You control the game and the rules.
            </div>
          </div>
          <div>
            <img src={heroImage1} className={styles.heroImage} alt="Play with your friends!" />
          </div>
        </section>

        <summary className={styles.summary}>
          <div className={styles.featuresHeader}>
            Checkout our features!
          </div>
          <div className={styles.hookBody}>
            <ul>
              <li>
                <i className="ra ra-jigsaw-piece" />
                <span>
                  Upload your own images and tokens!
                </span>
              </li>
              <li>
                <i className="ra ra-two-dragons" />
                <span>
                  High end fully immersive asset library!
                </span>
              </li>
              <li>
                <i className="ra ra-chessboard" />
                <span>
                  Build custom boards and grids with the click of a button!
                </span>
              </li>
              <li>
                <i className="ra ra-microphone" />
                <span>
                  Keep the conversation going with our fully integrated player chat!
                </span>
              </li>
              <li>
                <i className="ra  ra-double-team" />
                <span>
                  Unlimited players can join in the fun!
                </span>
              </li>
              <li>
                <i className="ra ra-perspective-dice-six" />
                <span>
                  A wide range of virtual dice to support your high end gaming expirience!
                </span>
              </li>
            </ul>
          </div>
        </summary>
      </div>
    </main>
  </>
);

export default Content;
