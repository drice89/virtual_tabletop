import React from 'react';
import styles from './with_modal.module.css';

const withModal = (Component) => {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.setWrapperRef = this.setWrapperRef.bind(this);
      this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentDidMount() {
      document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
      document.removeEventListener('mousedown', this.handleClickOutside);
    }

    setWrapperRef(node) {
      this.wrapperRef = node;
    }

    handleClickOutside(event) {
      const { toggleModal } = this.props;
      if (this.wrapperRef
        && !this.wrapperRef.contains(event.target)) {
        toggleModal(null);
      }
    }

    render() {
      const { active, toggleModal, ...restProps } = this.props;
      if (!active) return null;
      return (
        <div className={styles.modal}>
          <div ref={this.setWrapperRef}>
            <Component {...restProps} toggleModal={toggleModal} />
          </div>
        </div>
      );
    }
  };
};

export default withModal;
