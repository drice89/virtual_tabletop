import React from "react"
import withWidget from "../util/with_widget"
import widgetStyles from './widget.module.scss';
import HelpContainer from '../../help/help_container';
import { FiX } from 'react-icons/fi';

const HelpWidget = ({toggleWidget}) => (
  <div className={widgetStyles.container}>
    <div className={widgetStyles.header}>
      <div className={widgetStyles.title}>
        <i className="ra ra-help" />
        <h2>Help</h2>
      </div>
      <button type="button" className={widgetStyles.close} onClick={() => toggleWidget('widgetHelp')}>
        <FiX />
      </button>
    </div>
    <div className={widgetStyles.content}>
      <HelpContainer />
    </div>
  </div>
);

export default withWidget(HelpWidget);