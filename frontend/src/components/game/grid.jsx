import React from "react"
import map from "../../images/battlemap.jpg"
import './grid.css'
import TokenBar from "./token-bar"
import empty from "../../images/empty.png"

export default class Grid extends React.Component{

    constructor(props){
        super(props)
        this.handleBuildGrid = this.handleBuildGrid.bind(this)
        this.state = { row: null,
        col: null}
    }




    componentDidMount(){
        let zoom = 1;
        let grid = document.getElementsByClassName("grid")[0]
        grid.addEventListener('wheel', (e) => checkScrollDirection(e, grid));

        let wheeling = null
        function checkScrollDirection(event, element) {

            if (checkScrollDirectionIsUp(event)) {
                zoom += 0.01;
                element.style.zoom = zoom;
            } else {
                zoom -= 0.01;
                element.style.zoom = zoom
            }
            document.body.style.overflowY = "hidden"
            document.body.style.overflowX = "hidden"

            clearTimeout(wheeling);
            wheeling = setTimeout(() => {
                document.body.style.overflowY = "auto"
                document.body.style.overflowX = "auto"

            }, 500);
        }


        let zoom1 = 0.5;
        let background = document.getElementById("board-background")
        background.addEventListener('wheel', (e) => checkScrollDirection(e, background));

        let wheeling1 = null
        function checkScrollDirection(event, element) {

            if (checkScrollDirectionIsUp(event)) {
                zoom1 += 0.005;
                element.style.zoom = zoom1;
            } else {
                zoom1 -= 0.005;
                element.style.zoom = zoom1
            }
            document.body.style.overflow= "hidden"
            // document.body.style.overflowX = "hidden"

            clearTimeout(wheeling1);
            wheeling1 = setTimeout(() => {
                document.body.style.overflowY = "auto"
                document.body.style.overflowX = "auto"

            }, 500);
        }


        function checkScrollDirectionIsUp(event) {
            if (event.wheelDelta) {
                return event.wheelDelta > 0;
            }
            return event.deltaY < 0;
        }

        //////
        ////background image


        background.addEventListener("dragstart", (event) => {
            let emptyImg = document.getElementById("empty")
            event.dataTransfer.setDragImage(emptyImg, 0, 0);
        });
        background.addEventListener("drag", (event) => {
            let emptyImg = document.getElementById("empty")
            background.style.transform = `translate(${event.layerX * (1 / zoom1) - (background.width/2)}px,${event.layerY * (1 / zoom1) - (background.height/2)}px)`
        });


    }

    update(value){
        return e => {
            this.setState({[value]: e.currentTarget.value})
        }
    }

    handleBuildGrid() {
        let row = this.state.row;
        let col = this.state.col;

        const backgroundW = document.getElementById("board-background").width;
        const backgroundH = document.getElementById("board-background").height;
        // const backgroundW = document.getElementById("board-background").width;
        // const backgroundH = document.getElementById("board-background").height;

        const boxW = backgroundW / row;
        const boxH = backgroundH / col;

        let boxStyle = { width: boxW, height: boxH}

        let grid = []


        for (let i = 0; i < row; i++) {
            let rows = []

            for (let j = 0; j < col; j++) {
                rows.push(<div key={`grid-${i}-${j}`} className="box" style={boxStyle}></div>)
            }

            grid.push(<div key={`grid-${i}`} className="row">{rows}</div>)
            
        }
        
        this.setState({grid})
       
    }



    render(){
        return(
            <div>
               
               
                <div>
                    Rows <input onChange={this.update('row')} id="row" type="text" name="" id=""/>
                    Cols <input onChange={this.update('col')} id="col" type="text" name="" id=""/>
                    <button onClick={this.handleBuildGrid} id="set-grid">SET GRID</button>
                </div>

  
                <div className="container">
                        <div className="grid">
                            {this.state.grid ? this.state.grid : null}
                        </div>

                        <img id="board-background" src={map} draggable="true" className="background-image" />
                        <img id="empty" src={empty} />
                </div>

                <TokenBar/>
        

            </div>
        )
    }
}