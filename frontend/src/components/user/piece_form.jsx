import React from 'react';
import styles from './create_game.module.scss';
import PieceFormStyles from './piece_form_styles.module.scss';
import buttons from '../buttons.module.scss';
import FormData from 'form-data';

class PieceForm extends React.Component {
  constructor(props) {
    super(props)
    const { creatorId, imageUrl } = this.props;
    this.state = {
      creatorId,
      imageFile: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleImage = this.handleImage.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.focusRef = React.createRef(); 
  }

  componentDidMount() {
    this.focusRef.current.scrollIntoView();
  }

  handleChange(e) {
    this.setState({ imageUrl: e.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData();
    const { processForm } = this.props;
    const { creatorId, imageFile } = this.state;
    formData.append('creatorId', creatorId);
    formData.append('imageFile', imageFile);
    processForm(formData);
  }

  handleImage(e) {
    const img = e.target.files[0];

    this.setState({ imageFile: img });
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

  render() {
    const { errors, formType, pieces } = this.props;
    return (
      <div className={PieceFormStyles.container}>
        <div>
          <form className={styles.formContainer} onSubmit={this.handleSubmit}>
            {errors ? <span className={styles.errors}>{errors}</span> : ''}
            <input type="file" onChange={this.handleImage} />
            <button type="submit" className={buttons.secondary}>{formType}</button>
          </form>
        </div>
        <div>
          <ul className={PieceFormStyles.list}>
            {Object.values(pieces).map((piece) => (
              <li key={piece._id} className={PieceFormStyles.card}>
                <img className={PieceFormStyles.piece} src={piece.imageUrl} alt="" />
                <button type="button" onClick={this.handleDelete(piece._id)}>Delete Piece</button>
              </li>
            ))}
            <div ref={this.focusRef} />
          </ul>
        </div>
      </div>
    );
  }
}

export default PieceForm;
