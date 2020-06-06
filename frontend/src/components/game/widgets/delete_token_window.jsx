import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import styles from './delete_token_widget.module.scss';

const mapStateToProps = (state, ownProps) => ({
  tokens: ownProps.tokens,
  socket: ownProps.socket,
  highlightToken: ownProps.highlightToken
});


const DeleteTokenWindow = ({ tokens, socket, highlightToken }) => {
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
    let tokensHash = new Object()
    tokens.forEach(token => tokensHash[token._id] = token)
    return tokensHash
  }

  const [editableTokens, editTokens] = useState({})
  if (Object.values(editableTokens).length === 0 && tokens.length != 0){
    editTokens(convertTokenArrayToHash(tokens))
  }

  const editSingleToken = (token, e) => {
    let  nextTokens = { ... editableTokens}
    nextTokens[token._id].name = e.currentTarget.value;
    editTokens(nextTokens)
  }

  const updateTokenName = (token) => {
    if(editableTokens[token._id].name !== ""){
      socket.emit('updateToken', editableTokens[token._id])
    }else{
      let nextTokens = { ...editableTokens }
      nextTokens[token._id].name = "Name the token";
      editTokens(nextTokens);
    }
  }

  const tokensList = (
    <ul className={styles.tokenList}>
      {
       tokens.map((token) => (
         <li key={`${token._id}token-list-item`} className={styles.tokenItem} onMouseOver={() => highlightToken(token)} onMouseLeave={() => highlightToken(null)}>
           <input type="checkbox" onChange={handleChange(token)} />
           <input type="text" max="10" onChange={e => editSingleToken(token, e)} value={editableTokens[token._id] ? editableTokens[token._id].name : null } onBlur={() => updateTokenName(token)}/>
           <img src={token.imageUrl} className={styles.tokenImage}/>
         </li>
       ))
      }
    </ul>
  );

  return (
    <div className={styles.deleteTokenContainer}>
      <div className={styles.deleteTokenWrapper}>
        <div>
          Select Token(s) to Delete
        </div>
        <div>
          {tokensList}
        </div>
        <div>
          <button onClick={() => handleClick()}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default connect(mapStateToProps)(DeleteTokenWindow);
