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

  }

  componentDidMount() {
    const token = document.getElementById(`token-${this.props.piece._id}`);

    token.addEventListener('dragstart', () => {

      let token = {
        pos: {
          x: null,
          y: null
        },
        imageUrl: this.state.imageUrl,
        pieceId: this.props.piece._id,
        boardId: this.props.board._id,
        player: this.props.userId
      }

      this.props.setDraggingPiece(token);
    });
  }

  render() {
    return (
      <img id={`token-${this.props.piece._id}`} src={this.state.imageUrl} className={styles.token} />
    );
  }
}
