import React from 'react';
import styles from './create_game.module.scss';
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

    // const fileReader = new FileReader();

    // fileReader.onloadend = () => {
    //   this.setState({ imageFile: img });
    // };
    // // if (img) {
    // //   fileReader.readAsDataURL(img);
    // // }
  }

  render() {
    const { errors, formType } = this.props;
    return (
      <div className={styles.container}>
        <div className={styles.logo}>
          <i className="ra ra-anvil" />
          <p>{formType}</p>
        </div>
        <form className={styles.formContainer} onSubmit={this.handleSubmit}>
          {errors ? <span className={styles.errors}>{errors}</span> : ''}
          <input type="file" onChange={this.handleImage} />
          <button type="submit" className={buttons.secondary}>{formType}</button>
        </form>
      </div>
    );
  }
}

export default PieceForm;
