import React from "react"
import './grid.css'

import token2 from "../../images/token2.png"

import Token from "./token"


export default class TokenBar extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
        }
    }
    componentDidUpdate(){
        console.log(this.state.moved)
    }
    componentDidMount() {
        

    }


    render() {
        return (
            <div className="token-bar">
                <div className="token-bar-item">
                    <Token />
                </div>
                <div className="token-bar-item">
                    <img id='token-2' src={token2} className="token"/>
                </div>
            </div>
        )
    }
}