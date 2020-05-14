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
          Not conivnced? CHECKOUT OUR COOL FEATURES 
        </div>
        <div className={styles.hookBody}>
          Upload your own images and tokens! Too poor to afford your own? We got you covered with 
          our high end fully immersive asset library! Build custom boards and grids with the click 
          of a button. <strong>Did we mention, you can roll virtual dice!!!</strong> What are you 
          waiting for it's free! 
        </div>
      </aside>
    </main>
  </div>
)

export default Content;
