import React, { useState } from 'react';
import styles from './help.module.scss';
import * as HelpUtil from './help_util'
const HelpContainer = () => {
  const [activeItem, setActiveItem] = useState("")

  const handleClick = (tab) => {
    if (tab === activeItem) {
      tab = null
    }
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
        <li className={ activeItem === "about" ? styles.active : "" } onClick={() => handleClick("about")}><i className='ra ra-hospital-cross'></i>About</li>
          { activeItem === "about" ? displayHelpText(HelpUtil.howToPlayHelp) : null}
        <li className={ activeItem === "create-board" ? styles.active : ""} onClick={() => handleClick("create-board")}><i className='ra ra-hospital-cross'></i>Create and edit boards</li>
          { activeItem === "create-board" ? displayHelpText(HelpUtil.createBoardHelp) : null}
        <li className={ activeItem === "pieces" ? styles.active : "" } onClick={() => handleClick("pieces")}><i className='ra ra-hospital-cross'></i>Adding and moving pieces</li>
          { activeItem === "pieces" ? displayHelpText(HelpUtil.piecesHelp) : null }
        <li className={activeItem === "chat" ? styles.active : ""} onClick={() => handleClick("chat")}><i className='ra ra-hospital-cross'></i>Chat</li>
          { activeItem === "chat" ? displayHelpText(HelpUtil.chatHelp) : null}
        <li className= { activeItem === "invite-players" ? styles.active: "" } onClick={() => handleClick("invite-players")}><i className='ra ra-hospital-cross'></i>Invite Players</li>
          { activeItem === "invite-players" ? displayHelpText(HelpUtil.inviteHelp) : null}
      </ul>
    </div>
  )
}

export default HelpContainer