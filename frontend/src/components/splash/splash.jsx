import React from 'react';
import Header from './header';
import Content from './content';
import Footer from './footer';
import AboutUs from './about_us';
import styles from './header.module.scss';

const Splash = () => (
  <div className={styles.main}>
    <Header />
    <Content />
  {/* <AboutUs /> */}
    <Footer />
  </div>
);

export default Splash;
