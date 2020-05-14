import React from 'react';
import styles from './token.module.css';

import token1 from '../../images/token1.png';




export default class Token extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      moved: false,
      image: token1,
    };
    
  }




  componentDidUpdate() {
  }

  componentDidMount() {




    const token = document.getElementById('token-1');
    token.addEventListener('dragstart', (event) => {
      // event.preventDefault();
      event.dataTransfer.setData('Text', event.target.id);
      // event.dataTransfer.setDragImage(token, 0, 0);
      // token.style.padding = `${10}px`
      // token.style.backgroundColor = "red"
    });
    const grid = document.getElementById('grid');

    document.addEventListener('dragover', (event) => {
      event.preventDefault();
    });


    grid.addEventListener('drop', (event) => {
      event.preventDefault();

      const data = event.dataTransfer.getData('Text');
      if (event.target !== document.getElementById(data)) {
        // if (event.target.nodeName === "IMG") {
        // console.log(document.getElementById(data))
        //     event.target.parentNode.appendChild(document.getElementById(data));
        // } else {

        if (document.getElementById(data)) {

          let prev = document.getElementById(data).parentNode.id.split('-')
          let next = event.target.id.split('-')

           let move = {
            prev:
              { row: prev[0] , col: prev[1] },
            next:
              { row: next[0] , col: next[1]  }
          }
          
          
          event.target.appendChild(document.getElementById(data));
         
          
          this.props.handlePieceDrop(move)




        }

        // }
      }
      // token.style.border = "none"
      // token.style.padding = "0px 0px"
      // token.style.backgroundColor = "none"

      // token.style.transform = `translate(${x}px,${y}px)`;
    });
  }

  render() {
    return (
      <img id="token-1" src={token1} className={styles.token} />
    );
  }
}
