import React from 'react';
import Header from './header';
import Content from './content';
import Footer from './footer';
import CallToAction from './call_to_action';
import styles from './header.module.scss';

const Splash = () => (
  <div className={styles.main}>
    <Header />
    <Content />
    <CallToAction />
    <Footer />
  </div>
);

export default Splash;
