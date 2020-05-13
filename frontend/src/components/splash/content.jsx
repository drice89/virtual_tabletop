import React from "react";
import Carousel from "./carousel"
import styles from './content.module.scss';

const Content = () => (
  <div>
    <header> 
      <div className={styles.header}>
       <Carousel />
      </div>
    </header>
    <main>
      <aside className={styles.hookBox}>
        <div className={styles.hook}>
          Get Ready for the next generation of tabletop gaming.
          With Virtual TableTop you will experience Pen and Paper RPG &#39;s
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
      <aside>
        COOL FEATURES
      </aside>
    </main>
  </div>
)

export default Content;
