import React from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import styles from './token_bar.module.scss';
import Token from './token';
import DeleteTokenWindow from './widgets/delete_token_window';
import { compose } from 'redux';
import withWidget from './util/with_widget';


class TokenBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deleteToken: false,
    };

    this.scrollLeft = this.scrollLeft.bind(this);
    this.scrollRight = this.scrollRight.bind(this);
    this.createPiece = this.createPiece.bind(this);
  }

  componentDidMount() {
    this.bar = document.getElementById('token-bar');
  }

  toggleDeleteToken() {
    this.setState({ deleteToken: !this.state.deleteToken });
  }

  scrollLeft() {
    this.interval = setInterval(() => {
      this.bar.scrollLeft -= 3;
    }, 20);
  }

  scrollRight() {
    this.interval = setInterval(() => {
      this.bar.scrollLeft += 3;
    }, 20);
  }


  renderPieces() {
    return (
      <>
        {this.props.pieces.map((piece) => (
          <div className={styles.tokenBarItem} key={`piece-${piece._id}`} id={`piece-${piece._id}`}>

            <Token setDraggingPiece={this.props.setDraggingPiece} handlePieceDrop={this.props.handlePieceDrop} userId={this.props.userId} piece={piece} board={this.props.board} draggable="true" />
          </div>
        ))}
      </>
    );
  }

  createPiece() {
    this.props.createPiece({ userId: this.props.userId, piece: { imageUrl: 'https://i.imgur.com/voyrG5I.png', userId: this.props.userId } });
  }

  render() {
    const { toggleWidget } = this.props;
    return (
      <>
        <div className={styles.barContainer} id="bar-container">
          <div className={styles.arrows} onMouseEnter={this.scrollLeft} onMouseLeave={() => clearInterval(this.interval)}>
            <FiChevronLeft className={styles.leftArrow} />
          </div>

          <div className={styles.tokenBar} id="token-bar">
            <div className={styles.tokenActionContainer}>
              <div className={`${styles.tokenAction} ${styles.deleteTokenButton}`} onDrop={this.handleTokenDelete} onDragOver={(e) => e.preventDefault()}>
                <i className="ra ra-gear-hammer" title="Edit Token" onClick={() => toggleWidget('widgetDelete')} />
              </div>
            </div>
            <div className={styles.tokenBarContainer}>
              {this.renderPieces()}
              <h3 className={styles.tokenHeader}>Available Tokens</h3>
            </div>

            {/* <div className={styles.tokenActionContainer}>
              <div className={styles.tokenAction} onClick={this.createPiece}>
                <i className="ra ra-health-increase" title="Add Piece"/>
              </div>
            </div> */}


          </div>

          <div className={styles.arrows} onMouseEnter={this.scrollRight} onMouseLeave={() => clearInterval(this.interval)}>
            <FiChevronRight className={styles.rightArrow} />
          </div>
        </div>
        {/* { this.state.deleteToken && <DeleteTokenWindow socket={this.props.socket} tokens={this.props.tokens}/> } */}
      </>
    );
  }
}

export default compose(withWidget)(TokenBar);
