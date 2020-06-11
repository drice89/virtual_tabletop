import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import styles from './delete_token_widget.module.scss';
import buttons from '../../buttons.module.scss';


const DeleteTokenWindow = ({
  tokens, socket, highlightToken, userId,
}) => {
  const [localTokens, deleteTokens] = useState({});

  const handleClick = () => {
    Object.keys(localTokens).forEach((tokenId) => {
      const token = localTokens[tokenId];
      socket.emit('deleteToken', token);
    });
  };


  const handleChange = (token) => (e) => {
    let nextTokens = { ...localTokens };
    if (e.currentTarget.checked) {
      nextTokens[token._id] = token;
      deleteTokens(nextTokens);
    } else {
      nextTokens = delete nextTokens[token._id];
      deleteTokens(nextTokens);
    }
  };

  const convertTokenArrayToHash = (tokens) => {
    const tokensHash = new Object();
    tokens.forEach((token) => tokensHash[token._id] = token);
    return tokensHash;
  };

  const [editableTokens, editTokens] = useState({});
  if (Object.values(editableTokens).length === 0 && tokens.length != 0) {
    editTokens(convertTokenArrayToHash(tokens));
  }


  const editSingleToken = (token, e) => {
    const nextTokens = { ...editableTokens };
    nextTokens[token._id].name = e.currentTarget.value;
    editTokens(nextTokens);
  };

  const updateTokenName = (token) => {
    if (editableTokens[token._id].name !== '') {
      socket.emit('updateToken', editableTokens[token._id]);
    } else {
      const nextTokens = { ...editableTokens };
      nextTokens[token._id].name = 'Name the token';
      editTokens(nextTokens);
    }
  };

  useEffect(() => {
    editTokens(convertTokenArrayToHash(tokens));
  }, [tokens]);

  const tokensList = (
    <ul className={styles.tokenList}>
      {
       tokens.map((token) => {
         if (token.player === userId) {
           return (
             <li key={`${token._id}token-list-item`} className={styles.tokenItem} onMouseOver={() => highlightToken(token)} onMouseLeave={() => highlightToken(null)}>
               <input type="checkbox" onChange={handleChange(token)} />
               <img src={token.imageUrl} className={styles.tokenImage} />
               <input
                 type="text"
                 className={styles.input}
                 max="10"
                 onChange={(e) => editSingleToken(token, e)}
                 value={editableTokens[token._id] ? editableTokens[token._id].name : ''}
                 onBlur={() => updateTokenName(token)}
                 draggable
                 onDragStart={(e) => {
                   if (e.target.type === 'text') e.preventDefault();
                 }}
               />
             </li>
           );
         }
       })
      }
    </ul>
  );

  return (
    <div className={styles.deleteTokenWrapper}>
      <span className={styles.desc}>
        Select Token(s) to Delete
      </span>
      {tokensList}
      <div className={styles.buttonWrapper}>
        <button type="button" disabled={Object.keys(localTokens).length === 0 ? true : false} className={`${buttons.secondary} ${buttons.secondarySmall}`} onClick={() => handleClick()}>Delete</button>
      </div>
    </div>
  );
};

export default (DeleteTokenWindow);
