import React from 'react';
import Carousel from './carousel';
import styles from './content.module.scss';
import heroImage1 from '../../images/heroimage1.png';

const Content = () => (
  <>
    <div className={styles.background}>
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

      <main className={styles.hookBox}>
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

          <summary>
            <div className={styles.hookTagline}>
              Not convinced? CHECKOUT OUR COOL FEATURES
            </div>
            <div className={styles.hookBody}>
              Upload your own images and tokens! Too poor to afford your own? We got you covered with
              our high end fully immersive asset library! Build custom boards and grids with the click
              of a button.
              {' '}
              <strong>Did we mention, you can roll virtual dice!!!</strong>
              {' '}
              What are you
              waiting for it's free!
            </div>
          </summary>
      </main>
    {/* <div>
      <br>
      </br>
      <br>
      </br>
      <br>
      </br>
      <br>
      </br>
      <br>
      </br>
      <br>
      </br>
      <br>
      </br>
      <br>
      </br>
      <br>
      </br>
    </div> */}
  </>
);

export default Content;
