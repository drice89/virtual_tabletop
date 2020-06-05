import React from 'react';
import styles from './about_us.module.scss';
import github from '../../images/github-black.svg';
import linkIn from '../../images/linkedin-black.svg';
import Dias from '../../images/Dias.jpg';
import Wayne from '../../images/Wayne.jpg';
import Dillon from '../../images/Dillion.jpeg';
import Steven from '../../images/Steven_Touba.jpeg';

const AboutUs = () => (
  <>
    <a href="about" id='about'></a>
    <main className={styles.container}>
      <div className={styles.card}>
        <a href="https://www.linkedin.com/in/dias-iskrayev-a00053151/" target="_blank">
          <img className={styles.headshots} src={Dias} />
        </a>
        <header className={styles.header}>
          Dias Iskrayev
        </header>
        <div className={styles.links}>
          <a href="https://github.com/iskraev" target="_blank">
            <img
              className={styles.github}
              src={github}
              alt="github"
            />
          </a>
          <a href="https://www.linkedin.com/in/dias-iskrayev-a00053151/" target="_blank">
            <img className={styles.linkIN} src={linkIn} />
          </a>
        </div>
        <article className={styles.body}>
          A skilled full stack web developer who loves music and cats.
          When not clacking away he moonlights as influencer.
          Check him out on instagram
        </article>
      </div>

      <div className={styles.card}>
        <a href="https://www.linkedin.com/in/dillon-rice-48339a47/" target="_blank">
          <img className={styles.headshots} src={Dillon} />
        </a>
        <header className={styles.header}>
          Dillon Rice
        </header>
        <div className={styles.links}>
          <a href="https://github.com/drice89" target="_blank">
            <img
              className={styles.github}
              src={github}
              alt="github"
            />
          </a>
          <a href="https://www.linkedin.com/in/dillon-rice-48339a47/" target="_blank">
            <img className={styles.linkIN} src={linkIn} />
          </a>
        </div>
        <article className={styles.body}>
          Party in the back, bussiness upfront.
          Part-time developer and fullstack dungeon master.
          Loves tabletop gaming and painting minatures.
        </article>
      </div>

      <div className={styles.card}>
        <a href="https://www.linkedin.com/in/steven-touba-262197bb/" target="_blank">
          <img className={styles.headshots} src={Steven} />
        </a>
        <header className={styles.header}>
          Steven Touba
        </header>
        <div className={styles.links}>
          <a href="https://github.com/steventouba" target="_blank">
            <img
              className={styles.github}
              src={github}
              alt="github"
            />
          </a>
          <a href="https://www.linkedin.com/in/steven-touba-262197bb/" target="_blank">
            <img className={styles.linkIN} src={linkIn} />
          </a>
        </div>
        <article className={styles.body}>
          Lover of cats, dogs and all things gardening.
          Self-proffessed MMA aficionado, and terrible speller.
          Once binged all of Seinfeld in a single sitting.
        </article>
      </div>

      <div className={styles.card}>
        <a href="https://github.com/breakfasting" target="_blank">
          <img className={styles.headshots} src={Wayne} />
        </a>
        <header className={styles.header}>
          Wayne Su
        </header>
        <div className={styles.links}>
            <a href="https://github.com/breakfasting" target="_blank">
              <img className={styles.github} src={github} alt="github" />
            </a>
            <a href="https://www.linkedin.com/in/waynesu-an/" target="_blank">
              <div>
                <img className={styles.linkIN} src={linkIn} alt="linkedIn" />
              </div>
            </a>
        </div>
        <article className={styles.body}>
          No one has ever seen him and Dan Abramov in the same room.
          Come to think of it no one has ever seen him and Chuck Norris together.
        </article>
      </div>
    </main>
  </>
);

export default AboutUs;
