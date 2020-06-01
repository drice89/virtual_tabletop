import React from 'react';
import Nav from './ui/nav';
import Grid from './grid';

import styles from './game.module.scss';


// eslint-disable-next-line react/prefer-stateless-function
class Game extends React.Component {
  constructor(props){
    super(props)
  }

  componentDidMount(){
    this.props.fetchPieces(this.props.userId)
  }

  
  render() {
    return (
      <div className={styles.main}>
        <Nav currentUserId={this.props.userId} />
        <Grid {...this.props}/>
      </div>
    );
  }
}

export default Game;
