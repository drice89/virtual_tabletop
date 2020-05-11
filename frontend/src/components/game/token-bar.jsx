import React from "react"
import './grid.css'

import token1 from "../../images/token1.png"
import token2 from "../../images/token2.png"


export default class TokenBar extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            moved: false
        }
    }
    componentDidUpdate(){
        console.log(this.state.moved)
    }
    componentDidMount() {
        let images = document.getElementsByClassName("token")
        for (let i = 0; i < images.length; i++) {
            let token = images[i]
            console.log(token)
            token.addEventListener("dragstart", (event) => {
                // event.preventDefault();
                event.dataTransfer.setData("Text", event.target.id);
                event.dataTransfer.setDragImage(token, 0 ,0);
                token.style.padding = `${10}px`
                token.style.backgroundColor = "red"

            })


            document.addEventListener("dragover", (event) => {
                event.preventDefault();
            });


            document.addEventListener("drop", (event) => {
                event.preventDefault();
                let x = event.target.layerX;
                let y = event.target.layerY;
                var data = event.dataTransfer.getData("Text");
                if (event.target !== document.getElementById(data)) {
                    // if (event.target.nodeName === "IMG") {
                        // console.log(document.getElementById(data))
                    //     event.target.parentNode.appendChild(document.getElementById(data));
                    // } else {
                        event.target.appendChild(document.getElementById(data));
                    // }

                }
                token.style.border = "none"
                token.style.padding = "0px 0px"
                token.style.backgroundColor = "none"
                this.setState({moved: true})
                // token.style.transform = `translate(${x}px,${y}px)`;
            })
            
        }
    

    }


    render() {
        return (
            <div className="token-bar">
                <div className="token-bar-item">
                    <img id="token-1" src={token1} className="token"/>
                </div>
                <div className="token-bar-item">
                    <img id='token-2' src={token2} className="token"/>
                </div>
            </div>
        )
    }
}