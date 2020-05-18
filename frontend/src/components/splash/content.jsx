import React from 'react';
import Carousel from './carousel';
import styles from './content.module.scss';

import ornament from '../../images/ornament.png'

const Content = () => (
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

    <main className={styles.main}>
      <aside className={styles.hookBox}>
        <div className={styles.hook}>
          Get Ready for the next generation of tabletop gaming.
          With Virtual TableTop you will experience immersive board gaming
          like never before!
        </div>
        <div className={styles.hookBody}>
          Our easy to use, yet fully customizable interface lets you take charge
          of the action. You control the game and the rules.
        </div>
        <div className={styles.hookTagline}>
          Get Started Today, your Friends are waiting.
        </div>
      </aside>
      <aside className={styles.hookBox}>
        <div className={styles.hook}>
          Not convinced? CHECKOUT OUR COOL FEATURES
        </div>

        <button className={styles.footerLogin}><a href="/signup">Sign up</a></button>

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
      </aside>

      <img src={ornament} className={styles.ornament}/>
    </main>
  </div>
);

export default Content;
