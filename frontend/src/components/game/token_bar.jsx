import React from 'react';
import styles from './token_bar.module.scss';
import token2 from '../../images/token2.png';
import Token from './token';


import { FiChevronLeft } from "react-icons/fi";
import { FiChevronRight } from "react-icons/fi";


export default class TokenBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    

    this.scrollLeft = this.scrollLeft.bind(this)
    this.scrollRight = this.scrollRight.bind(this)
  }

  componentDidUpdate() {
    console.log(this.state.moved);
  }

  

  componentDidMount(){
    this.bar = document.getElementById('token-bar')
  

  }
  scrollLeft(){
    this.interval = setInterval(()=>{
      this.bar.scrollLeft -= 3; 
    },20) 
  }
  scrollRight(){
    this.interval = setInterval(() => {
      this.bar.scrollLeft += 3;
    }, 20)
  }

  render() {
    return (
      <div className={styles.barContainer} id="bar-container">


        <div className={styles.arrows} onMouseEnter={this.scrollLeft} onMouseLeave={()=> clearInterval(this.interval)}>
          <FiChevronLeft className={styles.leftArrow} />
        </div>


        <div className={styles.tokenBar} id="token-bar">
          <div className={styles.tokenBarContainer}>
            <div className={styles.tokenBarItem} id="bar-1" >
              <Token handlePieceDrop={this.props.handlePieceDrop} />
            </div>
            <div className={styles.tokenBarItem} id="bar-1" >
              <Token handlePieceDrop={this.props.handlePieceDrop} />
            </div>
            <div className={styles.tokenBarItem} id="bar-1" >
              <Token handlePieceDrop={this.props.handlePieceDrop} />
            </div>
            <div className={styles.tokenBarItem} id="bar-1" >
              <Token handlePieceDrop={this.props.handlePieceDrop} />
            </div>
            <div className={styles.tokenBarItem} id="bar-1" >
              <Token handlePieceDrop={this.props.handlePieceDrop} />
            </div>
            <div className={styles.tokenBarItem} id="bar-1" >
              <Token handlePieceDrop={this.props.handlePieceDrop} />
            </div>
            <div className={styles.tokenBarItem} id="bar-1" >
              <Token handlePieceDrop={this.props.handlePieceDrop} />
            </div>
            <div className={styles.tokenBarItem} id="bar-1" >
              <Token handlePieceDrop={this.props.handlePieceDrop} />
            </div>
            <div className={styles.tokenBarItem} id="bar-1" >
              <Token handlePieceDrop={this.props.handlePieceDrop} />
            </div>
            <div className={styles.tokenBarItem} id="bar-1" >
              <Token handlePieceDrop={this.props.handlePieceDrop} />
            </div>
            <div className={styles.tokenBarItem} id="bar-1" >
              <Token handlePieceDrop={this.props.handlePieceDrop} />
            </div>
            <div className={styles.tokenBarItem} id="bar-1" >
              <Token handlePieceDrop={this.props.handlePieceDrop} />
            </div>
            <div className={styles.tokenBarItem} id="bar-1" >
              <Token handlePieceDrop={this.props.handlePieceDrop} />
            </div>

          </div >


          <div className={styles.addTokenContainer}>
            <div className={styles.addToken}>
              <i class="ra ra-health-increase"></i>
            </div>
          </div>





        </div>


        <div className={styles.arrows} onMouseEnter={this.scrollRight} onMouseLeave={() => clearInterval(this.interval)}>
          <FiChevronRight className={styles.rightArrow}/>
        </div>
      </div>
    );
  }
}
