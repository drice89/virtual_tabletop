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

    this.showHideTokenBar = this.showHideTokenBar.bind(this)

    this.createBoard = this.createBoard.bind(this)


    this.state = {
      row: null,
      col: null,
      zoomFactorGrid: null,
      zoomFactorImage: null,
      imagePosX: null,
      imagePosY: null,
      grid: null,
      opacity: null,
      borderColor: null,
      gridLocked: true,
      boardBackground: this.props.board.background,
      showInitialEdit: false

    };

    this.ENPOINT = 'localhost:5000';
    this.zoomGrid = { zoom: 1 };
    this.zoomBackground = { zoom: 1 };
    this.zoomContainer = { zoom: 1 };
  }


  componentDidUpdate() {
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


  handlePieceDrop(move) {
    socket.emit('move', move);
  }


  showHideTokenBar(e){
    if(e.pageY > window.innerHeight * 0.8){
      this.bar.style.display = 'flex'
    }else{
      this.bar.style.display = 'none'
    }
  }

  componentDidMount(){

    if (this.props.match.params.boardId) {

      this.container = document.getElementById('grid-container');
      this.container.addEventListener('wheel', this.checkScroll);



      let state = {
        row: this.props.board.row,
        col: this.props.board.col,
        zoomFactorGrid: this.props.board.zoomFactorGrid,
        zoomFactorImage: this.props.board.zoomFactorImage,
        imagePosX: this.props.board.imagePosX,
        imagePosY: this.props.board.imagePosY,
        // grid: null,
        opacity: this.props.board.opacity,
        borderColor: this.props.board.borderColor, 
        boardBackground: this.props.board.background,
        

      };


      this.setState(state, this.handleBuildGrid)

      this.bar = document.getElementById('bar-container')
      document.addEventListener('mousemove', this.showHideTokenBar)
      document.addEventListener('dragover', this.showHideTokenBar)
      this.bar.style.display = 'none'

    }else{
      this.setState({ showInitialEdit: true})
    }



    

    

    // setting up the socket
    socket = io(this.ENPOINT)


    
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

    this.setState({grid: null})

    console.log()
    const { row } = this.state;
    const { col } = this.state;

    const backgroundW = document.getElementById('board-background').width;
    const backgroundH = document.getElementById('board-background').height;
    // const backgroundW = document.getElementById('grid-container').offsetWidth;
    // const backgroundH = document.getElementById('grid-container').offsetHeight;

    const boxW = backgroundW / col;
    const boxH = backgroundH / row;

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
    //need to check if we need that
    this.posX = event.layerX * (1 / this.zoomBackground.zoom) - (this.background.width / 2);
    this.posY = event.layerY * (1 / this.zoomBackground.zoom) - (this.background.height / 2);
  }

  createBoard(){
    let background = document.getElementById('board-background')

    //another
    var rect = background.getBoundingClientRect();

    //we can try this.posX this.posY
    
    let board = {};
    board.row = this.state.row
    board.col = this.state.col
    //we can try this.posX this.posY
    board.imagePosX = rect.x;
    board.imagePosY = rect.y;
    
    
    board.opacity = 1;
    board.borderColor = "white";
    board.boardBackground = this.state.boardBackground;
    board.zoomFactorGrid = this.zoomGrid.zoom;
    board.zoomFactorImage = this.zoomBackground.zoom;

    //this.props.createBoard(board)
    //  .then((board) => this.props.history.push(`{this.props.history.path}/${board.id}`))



  }

  handleImageClick(){
    let file = document.getElementById('image-upload');
    file.click();
  }

  handleImage(e){
    let img = e.currentTarget.files[0];
    this.setState({ boardBackground: img});

  }


  render() {
    return (
      <div > 

        {this.state.showInitialEdit ? <div className={styles.initialSetup}>
          <div className={styles.initialInputs}>
            Rows
              <input onChange={this.update('row')} id="row" className={styles.gridInputs} type="text" name="" maxlength="2" />

              Cols
              <input onChange={this.update('col')} id="col" className={styles.gridInputs} type="text" name="" maxlength="2" />
          </div>

          <div className={styles.gridButtons}>
            <button onClick={this.handleBuildGrid} id="set-grid">Set grid</button>
            <button className={styles.lockButton} onClick={this.handleLock}>{this.state.gridLocked ? 'Unlock grid' : 'Lock grid'}</button>
            <button onClick={this.handleImageClick}>Upload background</button>
            <button onClick={this.createBoard}>Create board</button>
          </div>

          <input type="file" onChange={this.handleImage} className={styles.imageFile} id="image-upload"></input> 
        </div> : null}


        <div className={styles.container} id="grid-container">
          <div id="grid" className={styles.grid}>
            {this.state.grid ? this.state.grid : null}
          </div>

          <img id="board-background" src={this.state.boardBackground} draggable="true" className={styles.backgroundImage} />
          <img id="empty" src={empty} className={styles.empty} />
        </div>

        

        {this.props.match.params.boardId ? <TokenBar handlePieceDrop={this.handlePieceDrop} /> : null}


      </div>
    );
  }
}
