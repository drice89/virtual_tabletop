import React from 'react';
import styles from './piece.module.scss'
export default class Piece extends React.Component{
    constructor(props){
        super(props)
    }



    render(){
        return(
            <div>
                <img src={this.props.piece.imageUrl} className={styles.pieceImage}/>
            </div>
        )
    }
}
    

