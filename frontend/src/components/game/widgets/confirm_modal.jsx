import React from 'react';
import styles from './confirm_modal.module.scss';
import buttons from '../../buttons.module.scss';
import { FiTrash2 } from 'react-icons/fi';
import withModal from '../util/with_modal';

class ConfirmModal extends React.Component {
  constructor(props) {
    super(props);
    const { creatorId } = this.props;
    this.state = {
      name: '',
      description: '',
      backgroundImage: '',
      creatorId,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { createGame, history, errors } = this.props;
    createGame(this.state).then((gameId) => {
      if (gameId) {
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
    const { board, toggleModal } = this.props;
    return (
      <div className={styles.container}>
        <div className={styles.logo}>
          <i className="ra ra-demolish" />
          <p>Delete Board?</p>
        </div>
        <form className={styles.formContainer} onSubmit={this.handleSubmit}>
          <div className={styles.text}>
            <span className={styles.name}>
              {board.name}
            </span>
            <span className={styles.message}>
              Are you sure you want to delete this board?
            </span>
          </div>
          <button type="submit" className={`${buttons.secondary} ${buttons.gold}`}>Confirm</button>
          <button type="button" className={buttons.secondary} onClick={() => toggleModal(null)}>Cancel</button>
        </form>
      </div>
    );
  }
}

export default withModal(ConfirmModal);
