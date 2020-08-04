import React, { useState } from 'react';
import styles from './help.module.scss';
import * as HelpUtil from './help_util'
const HelpContainer = () => {
  const [activeItem, setActiveItem] = useState("")

  const handleClick = (tab) => {
    setActiveItem(tab)
  }

  const displayHelpText = (component) => (
    <>
      {component}
    </>
  )
  return (
    <div>
      <ul className={styles.topicHeader}>
        <li onClick={() => handleClick("about")}><i className='ra ra-hospital-cross'></i>About</li>
          { activeItem === "about" ? displayHelpText(HelpUtil.howToPlayHelp) : null}
        <li onClick={() => handleClick("create-board")}><i className='ra ra-hospital-cross'></i>Create and edit boards</li>
          { activeItem === "create-board" ? displayHelpText(HelpUtil.createBoardHelp) : null}
        <li onClick={() => handleClick("pieces")}><i className='ra ra-hospital-cross'></i>Adding and moving pieces</li>
          { activeItem === "pieces" ? displayHelpText(HelpUtil.piecesHelp) : null}
        <li onClick={() => handleClick("chat")}><i className='ra ra-hospital-cross'></i>Chat</li>
      </ul>
    </div>
  )
}

export default HelpContainer