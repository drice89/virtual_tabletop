import React from 'react';
import styles from './token.module.css';






export default class Token extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      moved: false,
      imageUrl: this.props.piece.imageUrl,
    };

    this.handleDropEvent = this.handleDropEvent.bind(this)
    
  }




  componentDidUpdate() {
  }


  handleDropEvent(event){
    const data = event.dataTransfer.getData('Text');
    // console.log(data)


    if (event.target !== document.getElementById(data)) {
      // if (event.target.nodeName === "IMG") {
      // console.log(document.getElementById(data))
      //     event.target.parentNode.appendChild(document.getElementById(data));
      // } else {

      if (document.getElementById(data)) {

        let prev = document.getElementById(data).parentNode.id.split('-')
        if (prev) {
          let next = event.target.id.split('-')

          let token = {
            pos: {
              x: next[1],
              y: next[2]
            },
            imageUrl: this.state.imageUrl,
            pieceId: this.props.piece._id,
            boardId: this.props.board._id,
            player: this.props.userId
          }

          event.target.appendChild(document.getElementById(data));


          this.props.handlePieceDrop(token)
        }
      }

      // }
    }


    const grid = document.getElementById('grid');
    grid.removeEventListener('drop', this.handleDropEvent)

  }

  componentDidMount() {


    const grid = document.getElementById('grid');


    const token = document.getElementById(`token-${this.props.piece._id}`);
    token.addEventListener('dragstart', (event) => {
      // event.preventDefault();
      event.dataTransfer.setData('Text', event.target.id);
      // event.dataTransfer.setDragImage(token, 0, 0);
      // token.style.padding = `${10}px`
      // token.style.backgroundColor = "red"
      grid.addEventListener('drop', this.handleDropEvent)


    });

    document.addEventListener('dragover', (event) => {
      event.preventDefault();
    });


    // token.addEventListener('drop', (event) => {
    //   event.preventDefault();

    //   console.log(event)
    //   const data = event.dataTransfer.getData('Text');
    //   if (event.target !== document.getElementById(data)) {
    //     // if (event.target.nodeName === "IMG") {
    //     // console.log(document.getElementById(data))
    //     //     event.target.parentNode.appendChild(document.getElementById(data));
    //     // } else {

    //     if (document.getElementById(data)) {

    //       let prev = document.getElementById(data).parentNode.id.split('-')
    //      if(prev){
    //        let next = event.target.id.split('-')

    //        let token = {
    //          pos: {
    //            x: next[0],
    //            y: next[1]
    //          },
    //          imageUrl: this.state.imageUrl,
    //          pieceId: this.props.piece._id,
    //          boardId: this.props.board._id,
    //          player: this.props.userId
    //        }

    //        event.target.appendChild(document.getElementById(data));


    //        this.props.handlePieceDrop(token)
    //      }
    //     }

    //     // }
    //   }
    //   token.style.border = "none"
    //   token.style.padding = "0px 0px"
    //   token.style.backgroundColor = "none"

    //   token.style.transform = `translate(${x}px,${y}px)`;
    // });
  }

  render() {
    return (
      <img id={`token-${this.props.piece._id}`} src={this.state.imageUrl} className={styles.token} />
    );
  }
}
