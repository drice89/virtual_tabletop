import React from 'react';
import styles from './token_bar.module.css';
import token2 from '../../images/token2.png';
import Token from './token';


export default class TokenBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidUpdate() {
    console.log(this.state.moved);
  }

  componentDidMount() {


  }


  render() {
    return (
      <div className={styles.tokenBar}>
        <div className={styles.tokenBarItem}>
          <Token />
        </div>
        <div className={styles.tokenBarItem}>
          <Token />
          {/* <img id="token-2" src={token2} className="token" /> */}
        </div>
      </div>
    );
  }
}
