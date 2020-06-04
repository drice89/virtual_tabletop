import React from 'react';
import { FiChevronDown } from "react-icons/fi";
import Styles from './accordian.module.css';

class Accordion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
    };
    this.toggleActive = this.toggleActive.bind(this);
  }

  toggleActive() {
    const { active } = this.state;
    this.setState({ active: !active });
  }

  render() {
    const { title, content } = this.props;
    const { active } = this.state;

    return (
      <div>
        <div className={Styles.header}>
          <header className={Styles.accordion__header}>{title}</header>
          <button type="button" onClick={this.toggleActive}><FiChevronDown /></button>
        </div>
        {active && <p className={Styles.accordion__content}>{content}</p>}
      </div>
    )
  }
}

export default Accordion;
