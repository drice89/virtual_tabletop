import React, { useState, useEffect } from 'react';
import styles from './help.module.scss';

const HelpContainer = () => {
  const [activeItem, setActiveItem] = useState("")

  const handleClick = (tab) => {
    setActiveItem(tab)
  }
  return (
    <div>
      <ul className={styles.topicHeader}>
        <li onClick={() => handleClick("create-board")}><i className='ra ra-hospital-cross'></i>Create a board</li>
        
        <li onClick={() => handleClick("edit-board")}><i className='ra ra-hospital-cross'></i>Edit a board</li>
        <li onClick={() => handleClick("pieces")}><i className='ra ra-hospital-cross'></i>Adding and moving pieces</li>
        <li onClick={() => handleClick("chat")}><i className='ra ra-hospital-cross'></i>Chat</li>
      </ul>
    </div>
  )
}

export default HelpContainer