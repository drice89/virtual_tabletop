import React from 'react';
import { FiChevronDown } from "react-icons/fi";
import Styles from './accordian.module.scss';

const Accordion = (Component) => {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        active: false,
      };
      this.toggleActive = this.toggleActive.bind(this);
    }

    toggleActive() {
      const { active } = this.state;
      this.setState({ active: !active }, () => {
        const test = document.documentElement;
        test.scrollTop = test.scrollHeight;
      });
    }

    render() {
      const { title } = this.props;
      const { active } = this.state;

      return (
        <div>
          <div className={Styles.header}>
            <header className={Styles.accordion__header}>{title}</header>
            <button
              type="button"
              onClick={this.toggleActive}>
              <FiChevronDown className={active ? `${Styles.rotate} ${Styles.icon}` : Styles.icon} />
            </button>
          </div>
          <div id="content-box" className={active ? `${Styles.content} ${Styles.activeContent}` : Styles.content}>
            {active && <Component />}
          </div>
        </div>
      );
    }
  };
};

export default Accordion;
