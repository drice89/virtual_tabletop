import React from 'react';
import io from 'socket.io-client';
import map from '../../images/battlemap.jpg';
import styles from './grid.module.css';
import TokenBar from './token_bar';
import empty from '../../images/empty.png';
import { receiveBoard } from '../../actions/board_actions';


// Get all elements nececssary into state
// dispatch create board
// create board on controller should call image upload
// return res and dispatch changes to state


// /games/:gameid/boards

// games/chess/boards/


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

    this.showHideTokenBar = this.showHideTokenBar.bind(this);

    this.createBoard = this.createBoard.bind(this);
    this.handleImage = this.handleImage.bind(this);


    this.state = {
      row: null,
      col: null,
      zoomFactorGrid: null,
      zoomFactorImage: null,
      offSetX: null,
      offSetY: null,
      grid: null,
      opacity: null,
      borderColor: null,
      gridLocked: true,
      boardBackground: null,
      showInitialEdit: false,
      previewUrl: null,
      imageUrl: null,
    };

    this.ENPOINT = 'localhost:5000';
    this.zoomGrid = { zoom: 1 };
    this.zoomBackground = { zoom: 1 };
    this.zoomContainer = { zoom: 1 };
  }

  handlePieceDrop(move) {
    socket.emit('move', move);
  }


  showHideTokenBar(e) {
    if (e.pageY > window.innerHeight * 0.8) {
      this.bar.style.display = 'flex';
    } else {
      this.bar.style.display = 'none';
    }
  }

  componentDidMount() {
    if (this.props.match.params.boardId) {
      this.props.fetchBoard(this.props.match.params.boardId)
        .then(()=>{
          
          this.container = document.getElementById('grid-container');
          
          this.container.addEventListener('wheel', this.checkScroll);
          console.log(this.props.board)
          // debugger
          const state = {
            row: this.props.board.gridSize.rows,
            col: this.props.board.gridSize.cols,
            zoomFactorGrid: this.props.board.gridSize.gridZoomFactor,
            zoomFactorImage: this.props.board.imageAttributes.imageZoomFactor,
            imagePosX: this.props.board.imageAttributes.offsetX,
            imagePosY: this.props.board.imageAttributes.offsetY,
            opacity: this.props.board.settings.opacity,
            borderColor: this.props.board.settings.gridColor,
            imageUrl: this.props.board.backgroundImageUrl,
          };
          this.grid = document.getElementById('grid');
          this.grid.style.zoom = this.props.board.gridSize.gridZoomFactor;
          this.zoomGrid = { zoom: this.props.board.gridSize.gridZoomFactor };


          this.setState(state, this.handleBuildGrid);

          this.bar = document.getElementById('bar-container');
          document.addEventListener('mousemove', this.showHideTokenBar);
          document.addEventListener('dragover', this.showHideTokenBar);
          this.bar.style.display = 'none';
          // this.handleBuildGri .d();
        })
    } else {
      this.setState({ showInitialEdit: true });
    }


    // setting up the socket
    socket = io(this.ENPOINT);
  }

  componentWillUnmount() {
    this.container = document.getElementById('grid-container');
    this.container.removeEventListener('wheel', this.checkScroll);
  }

  update(value) {
    return (e) => {
      this.setState({ [value]: e.currentTarget.value });
    };
  }

  handleBuildGrid() {
    this.setState({ grid: null });

    console.log();
    const { row } = this.state;
    const { col } = this.state;

    const backgroundW = document.getElementById('board-background').offsetWidth;
    const backgroundH = document.getElementById('board-background').height;
    // const backgroundW = document.getElementById('grid-container').width;
    // const backgroundH = document.getElementById('grid-container').height;

    const boxH = backgroundH / row;
    const boxW = backgroundW / col;

    const boxStyle = { width: boxW, height: boxH};

    const grid = [];


    for (let i = 0; i < row; i++) {
      const rows = [];

      for (let j = 0; j < col; j++) {
        rows.push(<div key={`grid-${i}-${j}`} id={`${i}-${j}`} className={`${styles.box} box`} style={boxStyle} />);
      }

      grid.push(<div key={`grid-${i}`} className={`${styles.row} row`} >{rows}</div>);
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
    // need to check if we need that
    this.posX = event.layerX * (1 / this.zoomBackground.zoom) - (this.background.width / 2);
    this.posY = event.layerY * (1 / this.zoomBackground.zoom) - (this.background.height / 2);
  }

  createBoard() {
    const background = document.getElementById('board-background');

    // another
    const rect = background.getBoundingClientRect();

    // we can try this.posX this.posY

    const board = {};

    //  const formData = new FormData();
        
    //   formData.append('name', 'test');
    //   formData.append('gameId', this.props.match.params.gameId);
    //   formData.append('gridSize', { rows: this.state.row, cols: this.state.col, gridZoomFactor: this.zoomGrid.zoom });
    //   formData.append('imageAttributes', { offSetX: rect.x, offSetY: rect.y, imageZoomFactor: this.zoomBackground.zoom });
    //   formData.append('settings', { gridColor: "#FFF", opacity: 1 });
    //   formData.append('backgroundImage', this.state.imageFile);


      // debugger


    board.name = 'thisIsStaticForNow';
    board.gameId = this.props.match.params.gameId;
    board.gridSize = { rows: this.state.row, cols: this.state.col, gridZoomFactor: this.zoomGrid.zoom };
    board.imageAttributes = { offsetX: rect.x, offsetY: rect.y, imageZoomFactor: this.zoomBackground.zoom };
    board.settings = { gridColor: "#FFF", opacity: 1 };
    board.backgroundImageUrl = this.state.imageUrl;

    //console.log(formData)
    // this.props.createBoard(board)
    //  .then((board) => this.props.history.push(`{this.props.history.path}/${board.id}`))
    // console.log(board);
    socket.emit('createBoard', board);
  }

  handleImageClick() {
    const file = document.getElementById('image-upload');
    file.click();
  }

  handleImage(e) {
    const img = e.currentTarget.files[0];
    
    const fileReader = new FileReader();
    console.log(fileReader.result);
    
    fileReader.onloadend = () => {
      this.setState({ imageFile: img, previewUrl: fileReader.result });
    };
    if (img) {
      fileReader.readAsDataURL(img);
    }
  }


  renderBoard(){
    const grid = document.getElementsByClassName('box');
    for (let i = 0; i < grid.length; i++) {
      grid[i].style.border = `1px solid ${this.state.color}`;
      grid[i].style.opacity = `${this.state.opacity / 100}`;
      grid[i].innerHTML = ''
    }

    for (let i = 0; i < this.props.board.tokens.length; i++) {
      let x = this.props.board.tokens[i].pos.x;
      let y = this.props.board.tokens[i].pos.y;

      let box = document.getElementById(`grid-${x}-${y}`)
      let img = document.createElement('img')
      //GOTTA ADD IMAGE URL
      img.src = this.props.board.tokens[i].imageUrl//
    }

    const gridHTML = document.getElementsByClassName("row");
    this.setState({grid: [gridHTML]})
  }

  renderImage() {
    if(this.state.boardBackground) {
      return this.state.boardBackground;
    } else {
      if(this.state.previewUrl){
        return this.state.previewUrl;
      } else {
        return null;
      }
    }
  }
    componentDidUpdate(prevProps) {
    // debugger
    socket.on('tokenMoved', (move) => {
      // const prev = document.getElementById(`${move.prev.row}-${move.prev.col}`);
      // const next = document.getElementById(`${move.next.row}-${move.next.col}`);

      // if (!next.innerHTML) {
      //   next.innerHTML = prev.innerHTML;
      //   prev.innerHTML = '';
      // }
      // this.renderBoard();
    });
    socket.on('boardCreated', (board) =>{
      // this.props.receiveBoard(board)
      // debugger
      this.props.history.push(`/games/${board.gameId}/boards/${board._id}`)
    })
  }



  render() {
    const { imageUrl } = this.state;
    return (
      <div>

        {this.state.showInitialEdit ? (
          <div className={styles.initialSetup}>
            <div className={styles.initialInputs}>
              Image
              <input onChange={this.update('imageUrl')} id="image" className={styles.gridInputs} value={imageUrl} type="text" name="" />
              Rows
              <input onChange={this.update('row')} id="row" className={styles.gridInputs} type="text" name="" maxLength="2" />
              Cols
              <input onChange={this.update('col')} id="col" className={styles.gridInputs} type="text" name="" maxLength="2" />
            </div>
          {/* {console.log(this.state.backgroundImage)} */}
            <div className={styles.gridButtons}>
              <button onClick={this.handleBuildGrid} id="set-grid">Set grid</button>
              <button className={styles.lockButton} onClick={this.handleLock}>{this.state.gridLocked ? 'Unlock grid' : 'Lock grid'}</button>
              {/* <button onClick={this.handleImageClick}>Upload background</button> */}
              <button onClick={this.createBoard}>Create board</button>
            </div>

            {/* <input type="file" onChange={this.handleImage} className={styles.imageFile} id="image-upload" /> */}
          </div>
        ) : null}


        <div className={styles.container} id="grid-container">
          
          <div id="grid" className={styles.grid}>
            {this.state.grid ? this.state.grid : null}
          </div>
          <div className={styles.imageContainer} >
            <img id="board-background" src={imageUrl} draggable="true" className={styles.backgroundImage} />
          </div>
          
          <img id="empty" src={empty} className={styles.empty} />
        </div>


        {this.props.match.params.boardId ? <TokenBar handlePieceDrop={this.handlePieceDrop} /> : null}


      </div>
    );
  }
}
