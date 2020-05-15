import React from 'react';
import io from 'socket.io-client';
import map from '../../images/battlemap.jpg';
import styles from './grid.module.css';
import TokenBar from './token_bar';
import empty from '../../images/empty.png';


//Get all elements nececssary into state
//dispatch create board
//create board on controller should call image upload
//return res and dispatch changes to state


// /games/:gameid/boards

//games/chess/boards/




let socket;


export default class Grid extends React.Component {
  constructor(props) {
    super(props);
    this.handleBuildGrid = this.handleBuildGrid.bind(this);
    this.handlePieceDrop = this.handlePieceDrop.bind(this);

    this.handleLock = this.handleLock.bind(this);
    this.checkScroll = this.checkScroll.bind(this);
    this.dataTransfer = this.dataTransfer.bind(this);
    this.moveBackground = this.moveBackground.bind(this);


    this.state = {
      row: (this.props.board.row || null),
      col: (this.props.board.col || null),
      zoomFactorGrid: (this.props.board.zoomFactor || null),
      zoomFactorImage: 0,
      imagePosX: "",
      imagePosY: "",
      grid: null,
      opacity: 1,
      borderColor: "" ,
      gridLocked: true,
      boardBackground: (this.props.board.background || '')

    };

    this.ENPOINT = 'localhost:5000';
    this.zoomGrid = { zoom: 1 };
    this.zoomBackground = { zoom: 1 };
    this.zoomContainer = { zoom: 1 };
  }


  componentDidUpdate() {
    if(this.props.match.params.boardId && (this.props.location.pathname.split('/')[this.props.location.pathname.split('/').length-1]=== "boards")) {
      this.props.history.push(`${this.props.location.pathname}/${this.props.match.params.boardId}`)
    });
    const grid = document.getElementsByClassName('box');
    for (let i = 0; i < grid.length; i++) {
      grid[i].style.border = `1px solid ${this.state.color}`;
      grid[i].style.opacity = `${this.state.opacity / 100}`;
    }
    socket.on('tokenMoved', (move) => {
      const prev = document.getElementById(`${move.prev.row}-${move.prev.col}`);
      const next = document.getElementById(`${move.next.row}-${move.next.col}`);

      if (!next.innerHTML) {
        next.innerHTML = prev.innerHTML;
        prev.innerHTML = '';
      }
    });
  }

  handleCreateGame(board) {
    socket.emit('createGame', board)
  }
  
  handlePieceDrop(move) {
    socket.emit('move', move);
  }


  componentDidMount() {
    // setting up the socket
    socket = io(this.ENPOINT);
    this.container = document.getElementById('grid-container');
    this.container.addEventListener('wheel', this.checkScroll);
    this.handleBuildGrid()
  }

  componentWillUnmount() {
    this.container.removeEventListener('wheel', this.checkScroll);
  }

  update(value) {
    return (e) => {
      this.setState({ [value]: e.currentTarget.value });
    };
  }

  handleBuildGrid() {
    const { row } = this.state;
    const { col } = this.state;

    // const backgroundW = document.getElementById('board-background').width;
    // const backgroundH = document.getElementById('board-background').height;
    const backgroundW = document.getElementById('grid-container').offsetWidth;
    const backgroundH = document.getElementById('grid-container').offsetHeight;

    const boxW = backgroundW / row;
    const boxH = backgroundH / col;

    const boxStyle = { width: boxW, height: boxH };

    const grid = [];


    for (let i = 0; i < row; i++) {
      const rows = [];

      for (let j = 0; j < col; j++) {
        rows.push(<div key={`grid-${i}-${j}`} id={`${i}-${j}`} className={styles.box} style={boxStyle} />);
      }

      grid.push(<div key={`grid-${i}`} className={styles.row}>{rows}</div>);
    }

    this.setState({ grid });
  }


  checkScrollDirection(event, element, zoomFactor, zoomSpeed) {
    if (checkScrollDirectionIsUp(event)) {
      zoomFactor.zoom += zoomSpeed;
      element.style.zoom = zoomFactor.zoom;
    } else {
      zoomFactor.zoom -= zoomSpeed;
      element.style.zoom = zoomFactor.zoom;
    }
    document.body.style.overflowY = 'hidden';
    document.body.style.overflowX = 'hidden';

    // clearTimeout(wheeling);
    // wheeling = setTimeout(() => {
    //   document.body.style.overflowY = 'auto';
    //   document.body.style.overflowX = 'auto';
    // }, 2000);

    function checkScrollDirectionIsUp(event) {
      if (event.wheelDelta) {
        return event.wheelDelta > 0;
      }
      return event.deltaY < 0;
    }
  }

  checkScroll(e) {
    // e.stopPropagation()
    if (this.state.gridLocked) {
      this.checkScrollDirection(e, this.container, this.zoomContainer, 0.005);
    } else if (e.target === document.getElementById('board-background')) {
      this.checkScrollDirection(e, this.background, this.zoomBackground, 0.005);
    } else {
      this.checkScrollDirection(e, this.grid, this.zoomGrid, 0.005);
    }
  }


  handleLock() {
    this.grid = document.getElementById('grid');

    this.background = document.getElementById('board-background');


    if (this.state.gridLocked) {
      this.grid.addEventListener('wheel', this.checkScroll);
      this.background.addEventListener('wheel', this.checkScroll);


      this.background.addEventListener('dragstart', this.dataTransfer);
      this.background.addEventListener('drag', this.moveBackground);
      this.setState({ gridLocked: false });
    } else {
      this.setState({ gridLocked: true });
      this.background.removeEventListener('wheel', this.checkScroll);
      this.grid.removeEventListener('wheel', this.checkScroll);
      this.background.removeEventListener('dragstart', this.dataTransfer);
      this.background.removeEventListener('drag', this.moveBackground);


      document.body.style.overflowY = 'auto';
      document.body.style.overflowX = 'auto';
    }
  }


  dataTransfer(event) {
    const emptyImg = document.getElementById('empty');
    event.dataTransfer.setDragImage(emptyImg, 0, 0);
  }

  moveBackground(event) {
    this.background.style.transform = `translate(${event.layerX * (1 / this.zoomBackground.zoom) - (this.background.width / 2)}px,${event.layerY * (1 / this.zoomBackground.zoom) - (this.background.height / 2)}px)`;
  }


  handleImageUpload() {
    this.state.

  }
  render() {
    return (
      <div style={{ color: 'white' }}>


        <div>
          Rows

          <input onChange={this.update('row')} id="row" type="text" name="" id="" />
          Cols

          <input onChange={this.update('col')} id="col" type="text" name="" id="" />
          <button onClick={this.handleBuildGrid} id="set-grid">SET GRID</button>
          <input type="file" onClick={this.handleImageUpload} id="image-upload">upload image</input> 
        </div>


        <div className={styles.container} id="grid-container">
          <div id="grid" className={styles.grid}>
            {this.state.grid ? this.state.grid : null}
          </div>

          <img id="board-background" src={this.state.boardBackground} draggable="true" className={styles.backgroundImage} />
          <img id="empty" src={empty} className={styles.empty} />
        </div>

        <button onClick={this.handleLock}>{this.state.gridLocked ? 'Unlock grid' : 'Lock grid'}</button>

        <TokenBar handlePieceDrop={this.handlePieceDrop} />


      </div>
    );
  }
}
