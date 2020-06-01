import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  tokens: Object.values(state.entities.tokens),
});


const DeleteTokenWindow = ({ tokens }) => {
  const [tokens, deleteTokens] = useState({})
  const handleClick = () => {
    for (let token in tokens) {
      //socket.emit("deleteToken", token)
    }
  }

  const handleChange = (token) => {
    return e => {
      let nextTokens = {...tokens}
      if(e.currentTarget.checked) {
        nextTokens[token._id] = token
        deleteTokens(nextTokens)
      } else {
        nextTokens = delete nextTokens[token._id]
        deleteTokens(nextTokens)
      }
    }
  } 
  const tokensList = (
    <ul>
      {
       tokens.map((token) => {
         <li key={`${token._id}token-list-item`}>
           <input type="checkbox" onChange={handleChange(token._id)} />
           <div>{token._id}</div>
         </li>;
       })
      }
    </ul>
  );

  return (
    <div className={style.hidden}>
      <div className={style.deleteTokenContainer}>
        <div>
          Select Token(s) to Delete
        </div>
        <div>
          {tokensList}
        </div>
        <div>
          <button onClick={() => this.delete()}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default connect();
