import React from 'react';
import image1 from '../../images/battlemap.jpg';
import image2 from '../../images/battlemap.jpg';
import './carousel.css';

export default class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      button1: 'active',
      button2: '',
      slide1: 'active-slide',
      slide2: '',
    };
  }

  componentDidMount() {
    this.button1 = document.getElementsByClassName('slide-1-button')[0];
    this.button2 = document.getElementsByClassName('slide-2-button')[0];
    this.slide1 = document.getElementById('slide-1');
    this.slide2 = document.getElementById('slide-2');
    this.slideInterval1 = null;
    this.slideInterval2 = null;

    this.randomInterval = setInterval(() => {
      if (this.state.button1 === 'active') {
        this.button2.click();
      } else {
        this.button1.click();
      }
    }, 6000);
  }

  componentWillUnmount() {
    clearInterval(this.randomInterval);
  }


  handleClick(e) {
    clearInterval(this.randomInterval);
    this.randomInterval = setInterval(() => {
      if (this.state.button1 === 'active') {
        this.button2.click();
      } else {
        this.button1.click();
      }
    }, 4000);

    const slide1 = document.getElementById('slide-1');
    const slide2 = document.getElementById('slide-2');

    if (e.currentTarget === this.button1 && this.state.slide1 !== 'active-slide') {
      slide1.style.transform = 'translateX(0%)';
      slide1.style.transition = 'transform 0.6s ease-in-out 0s';

      slide2.style.transform = 'translateX(100%)';
      slide2.style.transition = 'transform 0.6s ease-in-out 0s';
      this.setState({
        slide1: 'active-slide', slide2: '', button1: 'active', button2: '',
      });
    } else if (e.currentTarget === this.button2 && this.state.slide2 !== 'active-slide') {
      slide1.style.transform = 'translateX(-100%)';
      slide1.style.transition = 'transform 0.6s ease-in-out 0s';

      slide2.style.transform = 'translateX(0%)';
      slide2.style.transition = 'transform 0.6s ease-in-out 0s';
      this.setState({
        slide1: '', slide2: 'active-slide', button1: '', button2: 'active',
      });
    }
  }

  render() {
    return (
      <div className="index-carousel">
        <div className="carousel-text-header">
            Virtual Tabletop: Welcome to the Heart of Perfect Gaming
          </div>
        <div className="carousel-buttons">
          <div
            onClick={this.handleClick}
            className={`slide-1-button carousel-button ${this.state.button1}`}
          />
          <div
            onClick={this.handleClick}
            className={`slide-2-button carousel-button ${this.state.button2}`}
          />
        </div>

        <div className="carousel">
          <div
            id="slide-1"
            className={`carousel-item ${this.state.slide1}`}
          >
            <img src={image1} className="carousel-images" alt="party1" />
            <div className="carousel-text">
              <h3>Build your own board!</h3>
              <p>
                Play with other peeps, if you have them
                <br />
                It is free lol
                <br />
                I try to break it
              </p>
              <button className="carousel-text-button">
                Start playing
              </button>
            </div>
          </div>

          <div
            id="slide-2"
            className={`carousel-item ${this.state.slide2}`}
          >
            <img src={image2} className="carousel-images" alt="party2" />
            <div className="carousel-text git">
              <h3>Virtual Tabletop</h3>
              <p>
                Changed my life!
                <br />
                Once you go virtual you never go back
                <br />
                I will never go back
              </p>
              <button className="carousel-text-button">
                <a
                  href="https://github.com/iskraev/WaveSky"
                  className="github"
                >
                  GitHub
                </a>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
