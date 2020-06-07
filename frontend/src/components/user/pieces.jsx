import React from 'react';
import styles from './user_show.module.scss';
import pieceStyles from './pieces_styles.module.scss';
import buttons from '../buttons.module.scss';
import FormData from 'form-data';

import { FiChevronDown } from "react-icons/fi";
import Styles from '../game/util/accordian.module.scss';

class Pieces extends React.Component {
  constructor(props) {
    super(props)
    const { creatorId, imageUrl } = this.props;
    this.state = {
      active: true,
      creatorId,
      imageFile: null,
      showDelete: null
    };
    this.handleChange = this.handleChange.bind(this);
    
    this.handleDelete = this.handleDelete.bind(this);
    this.focusRef = React.createRef();
  }

  componentDidMount() {
    this.focusRef.current.scrollIntoView();
  }

  handleChange(e) {
    this.setState({ imageUrl: e.target.value });
  }

  

  handleDelete(pieceId) {
    const { deletePiece } = this.props;
    const { creatorId } = this.state;
    return (e) => {
      e.preventDefault();
      const payload = { creatorId, pieceId }
      deletePiece(payload);
    };
  }

  toggleHover(hover) {
    if (hover) {
      return { border: `2px solid ${this.props.myColor}`, boxShadow: `0 0 8px ${this.props.myColor}` }
    } else {
      return { border: `none` }
    }
  }

  render() {
    const {pieces, active } = this.props;
    return (
      <ul className={`${active ? pieceStyles.active : pieceStyles.hidden} ${pieceStyles.piecesList}`}>
        {Object.values(pieces).map((piece) => (

          <li key={piece._id} className={`${pieceStyles.singlePiece}`} onMouseOver={() => this.setState({ showDelete: piece._id })} onMouseOut={() => this.setState({ showDelete: null })}> <span onClick={this.handleDelete(piece._id)} className={`${pieceStyles.deletePieceButton}  ${this.state.showDelete === piece._id ? pieceStyles.showDelete : null}`} >&#x292C;</span>
            <img draggable="false" className={pieceStyles.singlePieceImage} src={piece.imageUrl} style={piece._id === this.state.showDelete ? this.toggleHover(!!this.state.showDelete) : null} />
          </li>
        ))}
        <div ref={this.focusRef} />
      </ul>)
  }
}

export default Pieces;
