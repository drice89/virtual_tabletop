import React from "react"
import './grid.css'

import token1 from "../../images/token1.png"


export default class Token extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            moved: false,
            image: token1,
        }
        // this.onDragStart = this.onDragStart.bind(this)
        // this.onDragEnd = this.onDragEnd.bind(this)
    }
    componentDidUpdate() {
        // console.log(this.state.moved)
    }
    componentDidMount() {
            let token = document.getElementById("token-1")
       
            
            console.log(token)
            token.addEventListener("dragstart", (event) => {
                // event.preventDefault();
                event.dataTransfer.setData("Text", event.target.id);
                // event.dataTransfer.setDragImage(token, 0, 0);
                // token.style.padding = `${10}px`
                // token.style.backgroundColor = "red"

            })
            let grid = document.getElementsByClassName('grid')[0]

            document.addEventListener("dragover", (event) => {
                event.preventDefault();
                let offsetY = grid.offsetTop
                let offsetX = grid.offsetLeft


                // console.log(event.target)


                // console.log(`${event.pageX - offsetX} ${event.pageY - offsetY}`)
             
                
            });


            grid.addEventListener("drop", (event) => {
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
                // token.style.border = "none"
                // token.style.padding = "0px 0px"
                // token.style.backgroundColor = "none"
               
                // token.style.transform = `translate(${x}px,${y}px)`;
            })

        
    }

    // onDragStart(event){
    //     event.dataTransfer.setData("Text", event.target.id);
    //     event.dataTransfer.setDragImage(this.state.image, 0, 0);
    // }
    // onDragEnd(){

    // }

    render() {
        return (
            <img id="token-1" src={token1} className="token" />
        )
    }
}