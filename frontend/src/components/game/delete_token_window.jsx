import React, { useState } from 'react';
import { connect } from 'react-redux';
import styles from './token_bar.module.scss';

const mapStateToProps = (state, ownProps) => ({
  tokens: Object.values(state.entities.tokens),
  socket: ownProps.socket,
});


const DeleteTokenWindow = ({ tokens, socket}) => {

  const [localTokens, deleteTokens] = useState({});

  const handleClick = () => {
    Object.keys(localTokens).forEach((tokenId) => {
      const token = localTokens[tokenId]
      socket.emit("deleteToken", token)
    }); 
  };


  const handleChange = (token) => {
    return (e) => {
      
      let nextTokens = { ...localTokens };
      if (e.currentTarget.checked) {
        nextTokens[token._id] = token;
        deleteTokens(nextTokens);
      } else {
        nextTokens = delete nextTokens[token._id];
        deleteTokens(nextTokens);
      }
    };
  };

  const tokensList = (
    <ul>
      {
       tokens.map((token) => {
        return (
          <li key={`${token._id}token-list-item`}>
            <input type="checkbox" onChange={handleChange(token)} />
            <div>{token._id}</div>
          </li>
        ) 
       })
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
