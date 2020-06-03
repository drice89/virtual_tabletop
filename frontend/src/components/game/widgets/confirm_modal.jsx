import React from 'react';
import styles from './confirm_modal.module.scss';
import buttons from '../../buttons.module.scss';
import withModal from '../util/with_modal';

class ConfirmModal extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { socket, board, toggleModal } = this.props;
    socket.emit('deleteBoard', board);
    toggleModal(null);
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
