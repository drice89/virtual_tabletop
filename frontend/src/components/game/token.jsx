import React from 'react';
import styles from './token.module.css';

export default class Token extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      moved: false,
      imageUrl: this.props.piece.imageUrl,
    };
  }

  componentDidMount() {
    const token = document.getElementById(`token-${this.props.piece._id}`);
    token.addEventListener('dragstart', (e) => {
      e.stopPropagation()
      // let img = token.cloneNode(true);
      // img.src = this.state.imageUrl;
      e.dataTransfer.setDragImage(token, token.offsetWidth / 2, token.offsetHeight / 2);

      const tokenPiece = {
        pos: {
          x: null,
          y: null,
        },
        imageUrl: this.state.imageUrl,
        pieceId: this.props.piece._id,
        boardId: this.props.board._id,
        player: this.props.userId,
      };

      this.props.setDraggingPiece(tokenPiece);
    });


    token.addEventListener('dragend', (e) => {
      e.stopPropagation()
      this.props.setDraggingPiece(null);
    });
  }

  render() {
    return (
      <img id={`token-${this.props.piece._id}`} src={this.state.imageUrl} className={styles.token} draggable="true" />
    );
  }
}
