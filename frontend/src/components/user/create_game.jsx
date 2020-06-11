import React from 'react';
import styles from './create_game.module.scss';
import buttons from '../buttons.module.scss';

class CreateGame extends React.Component {
  constructor(props) {
    super(props);
    const { creatorId, game: { _id, name, description, backgroundImage } } = this.props;
    this.state = {
      _id,
      name,
      description,
      backgroundImage,
      creatorId,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { clearErrors } = this.props;
    clearErrors();
  }

  handleSubmit(e) {
    e.preventDefault();
    const { processForm, history, errors, toggleModal } = this.props;
    processForm(this.state).then((gameId) => {
      if (gameId === 1) {
        toggleModal(null);
      } else if (gameId) {
        history.push(`/client/${gameId}`);
      }
    });
  }

  handleChange(form) {
    return (e) => {
      this.setState({ [form]: e.target.value });
    };
  }

  render() {
    const { errors, formType } = this.props;
    const { name, description, backgroundImage } = this.state;
    return (
      <div className={styles.container}>
        <div className={styles.logo}>
          <i className="ra ra-anvil" />
          <p>{formType}</p>
        </div>
        <form className={styles.formContainer} onSubmit={this.handleSubmit}>
          {errors.name ? <span className={styles.errors}>{errors.name}</span> : ''}
          <input type="text" placeholder="Name" value={name} onChange={this.handleChange('name')} />
          {/* {errors.description ? <span className={styles.errors}>{errors.description}</span> : ''} */}
          <input type="text" placeholder="Description" value={description} onChange={this.handleChange('description')} />
          {/* {errors.backgroundImage ? <span className={styles.errors}>{errors.backgroundImage}</span> : ''} */}
          <input type="text" placeholder="Thumbnail URL" value={backgroundImage} onChange={this.handleChange('backgroundImage')} />
          <button type="submit" className={buttons.secondary}>{formType}</button>
        </form>
      </div>
    );
  }
}

export default CreateGame;
