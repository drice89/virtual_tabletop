import React from 'react';
import styles from './content.module.scss';
import ornament from '../../images/ornament.png';

const CallToAction = (props) => (

  <div className={styles.ctaWrapper}>
    <div className={styles.callToAction}>
      <div className={styles.hookTagline}>
        <h1>Get started today, your friends are waiting.</h1>
      </div>
      <div>
        <button className={styles.footerLogin}><a href="/signup">Sign up</a></button>
      </div>
      <div className={styles.ornamentWrapper}>
        <img src={ornament} className={styles.ornament} alt="" />
      </div>
    </div>
  </div>

);

export default CallToAction;