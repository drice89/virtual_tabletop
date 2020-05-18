import React from 'react';
import io from 'socket.io-client';
import { withRouter } from 'react-router-dom';
import map from '../../images/battlemap.jpg';
import styles from './grid.module.scss';
import TokenBar from './token_bar';
import empty from '../../images/empty.png';
import { receiveBoard } from '../../actions/board_actions';
import FormData from 'form-data'


// import { createBoard } from '../../util/board_api_util';

// Get all elements nececssary into state
// dispatch create board
// create board on controller should call image upload
// return res and dispatch changes to state


// /games/:gameid/boards

// games/chess/boards/


let socket;


class Grid extends React.Component {
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
    };

    this.ENPOINT = 'localhost:5000/gamesNamespace';
    this.zoomGrid = { zoom: 1 };
    this.zoomBackground = { zoom: 1 };
    this.zoomContainer = { zoom: 1 };
  }

  handlePieceDrop(token) {
    console.log(token)
    this.props.createToken(token)
    // socket.emit('updateToken', token);
  }


  showHideTokenBar(e) {
    if (e.pageY > window.innerHeight * 0.8) {
      this.bar.style.display = 'flex';
    } else {
      this.bar.style.display = 'none';
    }
  }

  componentDidMount() {
    if (!this.props.create) {
      // this.props.fetchBoard(this.props.match.params.boardId)
        // .then(()=>{
          
          this.container = document.getElementById('grid-container');
          
          this.container.addEventListener('wheel', this.checkScroll);
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
            boardBackground: this.props.board.backgroundImageUrl,
          };
          this.grid = document.getElementById('grid');
          this.grid.style.zoom = this.props.board.gridSize.gridZoomFactor;
          this.zoomGrid = { zoom: this.props.board.gridSize.gridZoomFactor };


          this.setState(state, this.handleBuildGrid());

          this.bar = document.getElementById('bar-container');
          document.addEventListener('mousemove', this.showHideTokenBar);
          document.addEventListener('dragover', this.showHideTokenBar);
          this.bar.style.display = 'none';
          // this.handleBuildGri .d();
        // })
    } else {
      this.setState({ showInitialEdit: true });
    }


    // setting up the socket
    const roomId = this.props.match.params.gameId;
    socket = io(this.ENPOINT);
    socket.on('connect', () => {
      socket.emit('joinRoom', { roomId });
    });
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

    let img = document.getElementById('board-background')
      img.onload = () => {
        this.setState({ grid: null });

        const { row } = this.state;
        const { col } = this.state;

        const backgroundW = img.offsetWidth;
        const backgroundH = img.height;
        // const backgroundW = document.getElementById('grid-container').width;
        // const backgroundH = document.getElementById('grid-container').height;

        const boxH = backgroundH / row;
        const boxW = backgroundW / col;
        const boxStyle = { width: boxW, height: boxH };

        const grid = [];


        for (let i = 0; i < row; i++) {
          const rows = [];

          for (let j = 0; j < col; j++) {
            rows.push(<div key={`grid-${i}-${j}`} id={`grid-${i}-${j}`} className={`${styles.box} box`} style={boxStyle}></div>);
          }

          grid.push(<div key={`grid-${i}`} className={`${styles.row} row`} >{rows}</div>);
        }
        this.setState({ grid }, this.renderBoard);
       

        // clearInterval(upload)

      }
    img.src = this.state.previewUrl ? this.state.previewUrl : this.state.boardBackground ;


    
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

    // const board = {};
    // const formData = new FormData();
    // formData.append('name', 'test');
    // formData.append('gameId', this.props.match.params.gameId);

    // formData.append('rows', this.state.row);
    // formData.append('cols', this.state.col);
    // formData.append('gridZoomFactor', this.zoomGrid.zoom);

    // formData.append('offsetX', rect.x);
    // formData.append('offsetY', rect.y);
    // formData.append('imageZoomFactor', this.zoomBackground.zoom);

    // formData.append('gridColor', "#FFF");
    // formData.append('opacity', 1);
    // formData.append('backgroundImage', this.state.imageFile);

    // this.props.createBoard(formData)
    //   .then(() => console.log("TEST"))
    //   .catch((err)=> console.log(err))
    //    //.then(console.log, console.log);

    // createBoard from client
    const { createBoard } = this.props;
    const { row, col, imageFile } = this.state;
    createBoard(row, col, this.zoomGrid.zoom, rect.x, rect.y, this.zoomBackground.zoom, imageFile);
  }

  handleImageClick() {
    const file = document.getElementById('image-upload');
    file.click();
  }

  handleImage(e) {
    const img = e.currentTarget.files[0];
    
    const fileReader = new FileReader();
    
    fileReader.onloadend = () => {
      this.setState({ imageFile: img, previewUrl: fileReader.result });
    };
    if (img) {
      fileReader.readAsDataURL(img);
    }
  }

 
  renderBoard() {
    // const grid = document.getElementsByClassName('box');
    // for (let i = 0; i < grid.length; i++) {
    //   grid[i].style.border = `1px solid ${this.state.color}`;
    //   grid[i].style.opacity = `${this.state.opacity / 100}`;
    //   grid[i].innerHTML = ''
    // }

    

    let img = document.getElementById('board-background')

    const prevGrid = document.getElementById('grid')
    // prevGrid.innerHTML = ""
    


    const { row } = this.state;
    const { col } = this.state;

    const backgroundW = img.offsetWidth;
    const backgroundH = img.height;
    // const backgroundW = document.getElementById('grid-container').width;
    // const backgroundH = document.getElementById('grid-container').height;

    const boxH = backgroundH / row;
    const boxW = backgroundW / col;
    const boxStyle = { width: boxW, height: boxH };

    const grid = [];


    for (let i = 0; i < row; i++) {
      const rows = [];

      for (let j = 0; j < col; j++) {
      
        let found = false;

        for (let t = 0; t < this.props.tokens.length; t++) {
          
          if(this.props.tokens[t].pos.x === i && this.props.tokens[t].pos.y === j){
            rows.push(<div key={`grid-${i}-${j}`} id={`grid-${i}-${j}`} className={`${styles.box} box`} style={boxStyle} >
              <img src={this.props.tokens[t].imageUrl} className={styles.token}/>
              
            </div>);
            found = true;
            // console.log("FOUND")
            break;
          }
          
        }
        
        if(!found){
          rows.push(<div key={`grid-${i}-${j}`} id={`grid-${i}-${j}`} className={`${styles.box} box`} style={boxStyle} ></div>);
        }
        
        
          
        
      }

      grid.push(<div key={`grid-${i}`} className={`${styles.row} row`} >{rows}</div>);
    }
    // console.log(grid)
    this.setState({ grid });







    
    // for (let i = 0; i < this.props.tokens.length; i++) {
    //   let x = this.props.tokens[i].pos.x;
    //   let y = this.props.tokens[i].pos.y;
    //   let box = document.getElementById(`grid-${x}-${y}`)
    //   let img = document.createElement('img')
    //   img.src = this.props.tokens[i].imageUrl//
    //   // box.appendChild(img)
    //   console.log(box)
    // }
    // const gridHTML = document.getElementsByClassName("row");
    // console.log(this.state.grid, "THISI S GRId")
    // console.log(JSX.Element {return gridHTML}, "THISI S SECOND")
    // this.setState({ grid: })
  }

  renderImage() {
    // if ("https://wallpaperplay.com/walls/full/d/6/8/178663.jpg") {
    //   // console.log(this.state.boardBackground);
    //   return "https://wallpaperplay.com/walls/full/d/6/8/178663.jpg";
    // } else {
    //   if(this.state.previewUrl){
    //     return this.state.previewUrl;
    //   } else {
    //     return null;
    //   }
    // }
    if(this.state.boardBackground) {
      console.log("haha", this.state);
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
    socket.on('boardUpdated', (board) =>{
      // this.props.receiveBoard(board)
      // debugger
      this.props.history.push(`/games/${board.gameId}/boards/${board._id}`)
    })

    // socket.on('action', (data)=>{
    //   console.log(data)
    // })

    if (this.props.board && ( !prevProps.board || prevProps.board._id !== this.props.board._id)) {

      const state = {
        row: this.props.board.gridSize.rows,
        col: this.props.board.gridSize.cols,
        zoomFactorGrid: this.props.board.gridSize.gridZoomFactor,
        zoomFactorImage: this.props.board.imageAttributes.imageZoomFactor,
        imagePosX: this.props.board.imageAttributes.offsetX,
        imagePosY: this.props.board.imageAttributes.offsetY,
        opacity: this.props.board.settings.opacity,
        borderColor: this.props.board.settings.gridColor,
        boardBackground: this.props.board.backgroundImageUrl,
      };
      this.grid = document.getElementById('grid');
      console.log(this.props.board.gridSize.gridZoomFactor);
      this.grid.style.zoom = this.props.board.gridSize.gridZoomFactor;
      this.zoomGrid = { zoom: this.props.board.gridSize.gridZoomFactor };
      // debugger
      this.setState(state, this.handleBuildGrid);
    }
  }

  componentWillUnmount() {
    this.container = document.getElementById('grid-container');
    this.container.removeEventListener('wheel', this.checkScroll);
  }


  render() {
    const { imageUrl } = this.state;
    const { create, pieces, createPiece, userId, board } = this.props;
    return (
      <div>

        {create ? (
          <div className={styles.initialSetup}>
            <div className={styles.initialInputs}>
              {/* Image
              <input onChange={this.update('imageUrl')} id="image" className={styles.gridInputs} value={imageUrl} type="text" name="" /> */}
              Rows
              <input onChange={this.update('row')} id="row" className={styles.gridInputs} type="text" name="" maxLength="2" />
              Cols
              <input onChange={this.update('col')} id="col" className={styles.gridInputs} type="text" name="" maxLength="2" />
            </div>
          {/* {console.log(this.state.backgroundImage)} */}
            <div className={styles.gridButtons}>
              <button className={styles.setGrid} onClick={this.handleBuildGrid} id="set-grid">Set grid</button>
              <button className={styles.lockButton} onClick={this.handleLock}>{this.state.gridLocked ? 'Unlock grid' : 'Lock grid'}</button>
              <button className={styles.uploadBackground} onClick={this.handleImageClick} >Upload background</button>
              <button className={styles.createBoard} onClick={this.createBoard}>Create board</button>
            </div>

            <input type="file" onChange={this.handleImage} className={styles.imageFile} id="image-upload" />
          </div>
        ) : null}


        <div className={styles.container} id="grid-container">
          
          <div id="grid" className={styles.grid}>
            {console.log(this.state.grid)}
            {this.state.grid}
          </div>
          <div className={styles.imageContainer} >
            <img id="board-background" src={this.renderImage()} draggable="true" className={styles.backgroundImage} />
          </div>
          
          <img id="empty" src={empty} className={styles.empty} />
        </div>


        {!create ? <TokenBar handlePieceDrop={this.handlePieceDrop} pieces={pieces} createPiece={createPiece} userId={userId} board={board}/> : null}


      </div>
    );
  }
}

export default withRouter(Grid);
