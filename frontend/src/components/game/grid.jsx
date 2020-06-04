/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { withRouter } from 'react-router-dom';
import FormData from 'form-data';
import styles from './grid.module.scss';
import TokenBar from './token_bar';
import { createBoard } from '../../util/boards_api_util';


class Grid extends React.Component {
  constructor(props) {
    super(props);
    this.handleBuildGrid = this.handleBuildGrid.bind(this);

    this.setGrid = this.setGrid.bind(this)
    this.setFetchedGrid = this.setFetchedGrid.bind(this)

    this.handleLockGrid = this.handleLockGrid.bind(this);
    this.handleLockBackground = this.handleLockBackground.bind(this);
    this.dataTransfer = this.dataTransfer.bind(this);

    this.showHideTokenBar = this.showHideTokenBar.bind(this);

    this.createBoard = this.createBoard.bind(this);
    this.handleImage = this.handleImage.bind(this);

    this.setDraggingPiece = this.setDraggingPiece.bind(this)

    this.state = {
      row: null,
      col: null,
      zoomFactorGrid: null,
      zoomFactorImage: null,
      offSetX: null,
      offSetY: null,
      gridArray: null,
      opacity: null,
      borderColor: null,
      gridLocked: true,
      boardBackground: '',
      showInitialEdit: false,
      previewUrl: null,
      moveGrid: false,
      moveBackground: false,
    };

    this.ENPOINT = 'localhost:5000/gamesNamespace';

    this.dpr = 2;
    this.draggingPiece = null;

    this.backgroundImage = new Image();

    this.zoomGridTEST = 1;
    this.zoomBackground = 1;
    this.imageScreenFactor = 3;

    this.moveGrid = false;
    this.moveBackground = false;

    this.gridPosX = 0;
    this.gridPosY = 0;

    this.imagePosX = 0;
    this.imagePosY = 0;

    this.gridWidth = 0;
    this.gridHeight = 0;

  }


  showHideTokenBar(e) {
    if (e.pageY > window.innerHeight * 0.8) {
      this.bar.style.display = 'flex';
    } else {
      this.bar.style.display = 'none';
    }
  }

  componentDidMount() {

    this.props.socket.on('tokenUpdated', this.setFetchedGrid)
    this.props.fetchPieces(this.props.userId);

    let canvas = document.getElementById('canvas');

    if (!this.props.create) {
      const state = {
        row: this.props.board.gridSize.rows,
        col: this.props.board.gridSize.cols,
        zoomFactorGrid: this.props.board.gridSize.gridZoomFactor,
        zoomFactorImage: this.props.board.imageAttributes.imageZoomFactor,
        gridPosX: this.props.board.gridSize.gridPosX,
        gridPosY: this.props.board.gridSize.gridPosY,
        imagePosX: this.props.board.imageAttributes.imagePosX,
        imagePosY: this.props.board.imageAttributes.imagePosY,
        opacity: this.props.board.settings.opacity,
        borderColor: this.props.board.settings.gridColor,
        boardBackground: this.props.board.backgroundImageUrl,
      };

      this.zoomGridTEST = state.zoomFactorGrid;
      this.zoomBackground = state.zoomFactorImage;

      this.setState(state, this.setFetchedGrid);

      this.bar = document.getElementById('bar-container');
      document.addEventListener('mousemove', this.showHideTokenBar);
      document.addEventListener('dragover', this.showHideTokenBar);
      this.bar.style.display = 'none';

      document.addEventListener('dragover', (e) => {
        e.preventDefault();
      })

      canvas.addEventListener("drop", (e) => {
        if (this.draggingPiece) {
          let pos = this.getBoxLocation(e.layerX, e.layerY);

          this.draggingPiece.pos.x = pos[0];
          this.draggingPiece.pos.y = pos[1];

          let gridArray = this.state.gridArray;
          let image = new Image();
          image.onload = () => {
            gridArray[pos[1]][pos[0]] = [this.draggingPiece, image];
            this.draw();
          }
          image.src = this.draggingPiece.imageUrl;

          this.props.socket.emit('createToken', this.draggingPiece)

          this.setState({ gridArray }, () => {
            this.draggingPiece = null;

          });

        }
      })
    } else {
      this.setState({ showInitialEdit: true });
    }

    let mousePressed = false;
    let dragToken = null;
    let draggingImage = new Image;

    //puts all objects in canvas properly after resize
    window.onresize = () => {
      this.setupCanvas();
      this.draw();
    };

    let context = canvas.getContext('2d');

    canvas.addEventListener('wheel', (event) => {
      let pos = this.getBoxLocation(event.layerX, event.layerY);
      //if the mouse is on the grid
      if ((pos[0] >= 0 && pos[0] < this.state.col) && (pos[1] >= 0 && pos[1] < this.state.row)) {
        if (this.moveGrid) {
          if (checkScrollDirectionIsUp(event)) {
            this.zoomGridTEST += 0.005;
            this.gridPosX -= 1.4;
            this.gridPosY -= 1.2;

          } else {
            this.zoomGridTEST -= 0.005;
            this.gridPosX += 1.4;
            this.gridPosY += 1.2;
          }
        }
      }

      if (this.moveBackground) {
        if (checkScrollDirectionIsUp(event)) {
          this.zoomBackground += 0.005;
          this.imagePosX -= 1.4;
          this.imagePosY -= 1.2;

        } else {
          this.zoomBackground -= 0.005;
          this.imagePosX += 1.4;
          this.imagePosY += 1.2;

        }
      }

      context.clearRect(0, 0, canvas.width, canvas.height);
      this.draw();

      function checkScrollDirectionIsUp(event) {
        if (event.wheelDelta) {
          return event.wheelDelta > 0;
        }
        return event.deltaY < 0;
      }
    })

    canvas.addEventListener('mousedown', (e) => {
      if (!this.moveGrid && !this.moveBackground) {

        let pos = this.getBoxLocation(e.layerX, e.layerY);

        if ((pos[0] >= 0 && pos[0] < this.state.col) && (pos[1] >= 0 && pos[1] < this.state.row)) {

          let gridArray = Object.assign({}, this.state.gridArray)
          if (!mousePressed && this.state.gridArray[pos[1]][pos[0]]) {

            dragToken = this.state.gridArray[pos[1]][pos[0]][0];

            if (dragToken) {
              draggingImage.src = dragToken.imageUrl;
              mousePressed = true;;
              gridArray[pos[1]][pos[0]] = null;
              this.setState({ gridArray })
            }
          } else {
            mousePressed = false;
            if (dragToken) {
              let image = new Image();
              image.src = dragToken.imageUrl;
              gridArray[pos[1]][pos[0]] = [dragToken, image];
              this.setState({ gridArray }, () => {
                dragToken = null;
                draggingImage.src = "";
                context.clearRect(0, 0, canvas.width, canvas.height);
                this.draw();
              })
            }

          }
        }
      } else {
        if (mousePressed) {
          mousePressed = false;
          if (this.moveGrid) {
            this.gridPosX = e.layerX;
            this.gridPosY = e.layerY;
          }
          if (this.moveBackground) {
            this.imagePosX = e.layerX;
            this.imagePosY = e.layerY;
          }

          this.moveGrid = false;
          this.moveBackground = false;
        } else {
          mousePressed = true;
        }
      }

    })

    canvas.addEventListener('mousemove', (event) => {
      let pos = this.getBoxLocation(event.layerX, event.layerY);

      if ((pos[0] >= 0 && pos[0] < this.state.col) && (pos[1] >= 0 && pos[1] < this.state.row)) {
        if (!this.moveGrid && !this.moveBackground) {
          let canvas = document.getElementById('canvas')
          let width = this.backgroundImage.naturalWidth / this.imageScreenFactor / this.state.col * this.zoomGridTEST;
          let height = this.backgroundImage.naturalHeight / this.imageScreenFactor / this.state.row * this.zoomGridTEST;
          if (mousePressed) {
            context.clearRect(0, 0, canvas.width, canvas.height);

            let x = event.layerX;
            let y = event.layerY;

            this.draw();
            context.drawImage(draggingImage, x - width / 2, y - height / 2, width, height)
          }
        }
      }

      if (this.moveGrid) {
        if (mousePressed) {
          let x = event.layerX;
          let y = event.layerY;
          this.gridPosX = x;
          this.gridPosY = y;
          context.clearRect(0, 0, canvas.width, canvas.height);
          this.draw('gridDrag');
        }
      }

      if (this.moveBackground) {
        if (mousePressed) {
          let x = event.layerX;
          let y = event.layerY;

          this.imagePosX = x;
          this.imagePosY = y;
          context.clearRect(0, 0, canvas.width, canvas.height);
          this.draw('backgroundDrag');
        }
      }

    })

    canvas.addEventListener('mouseup', (e) => {
      if (!this.moveGrid && !this.moveBackground) {

        if (mousePressed) {
          let pos = this.getBoxLocation(e.layerX, e.layerY);
          if ((pos[0] >= 0 && pos[0] < this.state.col) && (pos[1] >= 0 && pos[1] < this.state.row)) {
            mousePressed = false;

            let gridArray = this.state.gridArray;
            dragToken.pos.x = pos[0];
            dragToken.pos.y = pos[1];
            let image = new Image();
            image.src = dragToken.imageUrl;
            gridArray[pos[1]][pos[0]] = [dragToken, image];


            this.setState({ gridArray }, () => {
              this.props.socket.emit('updateToken', dragToken)
              dragToken = null;
              draggingImage.src = "";
              context.clearRect(0, 0, canvas.width, canvas.height);
              this.draw();

            })
          }
        }
      } else {

        if (mousePressed) {

          let imageWidth = this.backgroundImage.naturalWidth / this.imageScreenFactor * this.zoomBackground;
          let imageHeight = this.backgroundImage.naturalHeight / this.imageScreenFactor * this.zoomBackground;

          let width = imageWidth / this.state.col * this.zoomGridTEST;
          let height = imageHeight / this.state.row * this.zoomGridTEST;


          let totalWidth = width * this.state.col;
          let totalHeight = height * this.state.row;

          mousePressed = false;

          if (this.moveGrid) {
            this.gridPosX = e.layerX - totalWidth / 2;
            this.gridPosY = e.layerY - totalHeight / 2;
          }

          if (this.moveBackground) {
            this.imagePosX = e.layerX - imageWidth / 2;
            this.imagePosY = e.layerY - imageHeight / 2;

          }
        }

      }
    })
  }

  update(value) {
    return (e) => {
      this.setState({ [value]: e.currentTarget.value });
    };
  }

  handleBuildGrid() {

    this.setupCanvas();
    let intRow;
    let intCol;
    let gridArray;
    if (this.state.row && this.state.col) {
      intRow = parseInt(this.state.row);
      intCol = parseInt(this.state.col);
      gridArray = new Array(intRow).fill(null).map(() => new Array(intCol).fill(null));

    }

    for (let token of this.props.tokens) {
      let x = token.pos.x;
      let y = token.pos.y;
      let image = new Image();
      gridArray[y][x] = [token, image];
      image.src = token.imageUrl;
    }

    let loaded = false;

    while (!loaded) {
      loaded = true;

      this.props.tokens.forEach(token => {
        let x = token.pos.x;
        let y = token.pos.y;
        if (!gridArray[y][x][1].src) {
          loaded = false;
        }
      })

      if (loaded) {
        this.setState({ gridArray, row: intRow, col: intCol }, this.draw);
      }
    }
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
    if (this.state.gridLocked) {
      this.checkScrollDirection(e, this.container, this.zoomContainer, 0.005);
    } else if (e.target === document.getElementById('board-background')) {
      this.checkScrollDirection(e, this.background, this.zoomBackground, 0.005);
    } else {
      this.checkScrollDirection(e, this.grid, this.zoomGrid, 0.005);
    }
  }


  handleLockGrid() {
    this.moveGrid = !this.moveGrid;
    this.moveBackground = false;
    this.setState({ moveGrid: this.moveGrid, moveBackground: false })
  }
  handleLockBackground() {
    this.moveGrid = false;
    this.moveBackground = !this.moveBackground;
    this.setState({ moveGrid: false, moveBackground: this.moveBackground })
  }

  dataTransfer(event) {
    const emptyImg = document.getElementById('empty');
    event.dataTransfer.setDragImage(emptyImg, 0, 0);
  }

  createBoard() {
    const formData = new FormData();
    formData.append('name', 'test');
    formData.append('gameId', this.props.match.params.gameId);

    formData.append('rows', this.state.row);
    formData.append('cols', this.state.col);
    formData.append('gridZoomFactor', this.zoomGridTEST);

    let gridPosX = this.gridPosX;
    let gridPosY = this.gridPosY;

    let imagePosX = this.imagePosX;
    let imagePosY = this.imagePosY;

    formData.append('gridPosX', gridPosX);
    formData.append('gridPosY', gridPosY);

    formData.append('imagePosX', imagePosX);
    formData.append('imagePosY', imagePosY);

    formData.append('imageZoomFactor', this.zoomBackground);

    formData.append('gridColor', "#FFF");
    formData.append('opacity', 1);
    formData.append('backgroundImage', this.state.imageFile);

    createBoard(formData)
      .then(() => true)
      .catch((err) => console.log(err))
  }

  handleImageClick() {
    const file = document.getElementById('image-upload');
    file.click();
  }

  handleImage(e) {
    const img = e.currentTarget.files[0];

    const fileReader = new FileReader();

    fileReader.onloadend = () => {
      this.setState({ imageFile: img, previewUrl: fileReader.result }, this.setGrid);
    };
    if (img) {
      fileReader.readAsDataURL(img);
    }
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
    if (this.state.boardBackground) {
      return this.state.boardBackground;
    } else {
      if (this.state.previewUrl) {
        return this.state.previewUrl;
      } else {
        return '';
      }
    }
  }

  componentDidUpdate(prevProps) {
    let canvas = document.getElementById('canvas');

    if (!prevProps.create && this.props.create) {
      const state = {
        row: null,
        col: null,
        zoomFactorGrid: null,
        zoomFactorImage: null,
        gridPosX: null,
        gridPosY: null,
        imagePosX: null,
        imagePosY: null,
        gridArray: null,
        opacity: null,
        borderColor: null,
        gridLocked: true,
        boardBackground: '',
        showInitialEdit: false,
        previewUrl: null,
      };
      this.setState(state, () => {

        let context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);

      });
    }

    if (this.props.board && (!prevProps.board || prevProps.board._id !== this.props.board._id)) {
      const state = {
        row: this.props.board.gridSize.rows,
        col: this.props.board.gridSize.cols,
        zoomFactorGrid: this.props.board.gridSize.gridZoomFactor,
        zoomFactorImage: this.props.board.imageAttributes.imageZoomFactor,
        gridPosX: this.props.board.gridSize.gridPosX,
        gridPosY: this.props.board.gridSize.gridPosY,
        imagePosX: this.props.board.imageAttributes.imagePosX,
        imagePosY: this.props.board.imageAttributes.imagePosY,
        opacity: this.props.board.settings.opacity,
        borderColor: this.props.board.settings.gridColor,
        boardBackground: this.props.board.backgroundImageUrl,
      };
      this.setState(state, this.setFetchedGrid);
    }
  }

  draw(action = null) {
    this.drawGrid(this.state.row, this.state.col, action);
  }

  drawGrid(row, col, action) {
    // Take canvas and set line width 1pc
    let canvas = document.getElementById('canvas')
    let context = canvas.getContext('2d');
    context.lineWidth = 1;

    let imageWidth = this.backgroundImage.naturalWidth / this.imageScreenFactor * this.zoomBackground;
    let imageHeight = this.backgroundImage.naturalHeight / this.imageScreenFactor * this.zoomBackground;

    let width = this.gridWidth * this.zoomGridTEST;
    let height = this.gridHeight * this.zoomGridTEST;

    let totalWidth = width * col;
    let totalHeight = height * row;

    if (action === 'backgroundDrag') {
      context.drawImage(this.backgroundImage, this.imagePosX - imageWidth / 2, this.imagePosY - imageHeight / 2, imageWidth, imageHeight)
    } else {
      context.drawImage(this.backgroundImage, this.imagePosX, this.imagePosY, imageWidth, imageHeight)
    }

    if (this.state.row && this.state.col) {
      for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {

          if (this.state.gridArray[i][j]) {
            let image = this.state.gridArray[i][j][1]

            if (action === "gridDrag") {
              context.drawImage(image, (j * width + this.gridPosX) - totalWidth / 2, (i * height + this.gridPosY) - totalHeight / 2, width, height);
            } else {
              context.drawImage(image, j * width + this.gridPosX, i * height + this.gridPosY, width, height);
            }
          }

          context.beginPath();
          context.strokeStyle = "white"
          if (action === 'gridDrag') {
            context.rect((j * width + 0.5 + this.gridPosX) - totalWidth / 2, (i * height + 0.5 + this.gridPosY) - totalHeight / 2, width, height)
          } else {
            context.rect(j * width + 0.5 + this.gridPosX, i * height + 0.5 + this.gridPosY, width, height)
          }
          context.stroke();
        }
      }
    }
  }

  getBoxLocation(x, y) {
    // Gets location of the mouse click on the canvas
    let boxWidth = this.gridWidth * this.zoomGridTEST;
    let boxHeight = this.gridHeight * this.zoomGridTEST;

    let colPicked = Math.floor(((x - this.gridPosX) / boxWidth));
    let rowPicked = Math.floor(((y - this.gridPosY) / boxHeight));
    return [colPicked, rowPicked];
  }

  setupCanvas() {
    // Scale canvas properly
    let canvas = document.getElementById('canvas')
    // Get the device pixel ratio, falling back to 1.
    // Get the size of the canvas in CSS pixels.
    var rect = canvas.getBoundingClientRect();
    // Give the canvas pixel dimensions of their CSS
    // size * the device pixel ratio.
    canvas.width = rect.width * this.dpr;
    canvas.height = rect.height * this.dpr;
    var ctx = canvas.getContext('2d');
    // Scale all drawing operations by the dpr, so you
    // don't have to worry about the difference.
    ctx.scale(this.dpr, this.dpr);
    ctx.lineWidth = 1;
  }

  setDraggingPiece(token) {
    this.draggingPiece = token;
  }

  setGrid() {
    this.backgroundImage.src = this.state.boardBackground ? this.state.boardBackground : this.state.previewUrl;
    this.backgroundImage.onload = () => {

      let imageWidth = this.backgroundImage.naturalWidth / this.imageScreenFactor;
      let imageHeight = this.backgroundImage.naturalHeight / this.imageScreenFactor;

      let canvas = document.getElementById('canvas')

      this.imagePosX = (canvas.offsetWidth - imageWidth) / 2;
      this.imagePosY = (canvas.offsetHeight - imageHeight) / 2;

      this.gridPosX = this.imagePosX;
      this.gridPosY = this.imagePosY;

      this.gridWidth = imageWidth / this.state.col * this.zoomGridTEST;
      this.gridHeight = imageHeight / this.state.row * this.zoomGridTEST;

      this.handleBuildGrid();
    }
  }


  setFetchedGrid() {
    this.backgroundImage.src = this.state.boardBackground ? this.state.boardBackground : this.state.previewUrl;
    this.backgroundImage.onload = () => {

      let imageWidth = this.backgroundImage.naturalWidth / this.imageScreenFactor;
      let imageHeight = this.backgroundImage.naturalHeight / this.imageScreenFactor;

      this.gridWidth = (imageWidth / this.state.col);
      this.gridHeight = (imageHeight / this.state.row);

      this.gridPosX = this.state.gridPosX;
      this.gridPosY = this.state.gridPosY;

      this.imagePosX = this.state.imagePosX;
      this.imagePosY = this.state.imagePosY;

      this.handleBuildGrid();
    }
  }

  render() {
    const {
      create, pieces, createPiece, userId, board,
    } = this.props;
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
              <button className={styles.setGrid} onClick={this.setGrid} id="set-grid">Set grid</button>

              <button className={styles.lockButton} onClick={this.handleLockGrid}>{!this.state.moveGrid ? 'Unlock grid' : 'Lock grid'}</button>
              <button className={styles.lockButton} onClick={this.handleLockBackground}>{!this.state.moveBackground ? 'Unlock background' : 'Lock background'}</button>

              <button className={styles.uploadBackground} onClick={this.handleImageClick}>Upload background</button>
              <button className={styles.createBoard} onClick={this.createBoard}>Create board</button>
            </div>

            <input type="file" onChange={this.handleImage} className={styles.imageFile} id="image-upload" />
          </div>
        ) : null}

        <div className={styles.container} id="grid-container">
          <canvas id='canvas'>
          </canvas>
        </div>

        {!create ? <TokenBar setDraggingPiece={this.setDraggingPiece} handlePieceDrop={this.handlePieceDrop} pieces={pieces} createPiece={createPiece} userId={userId} board={board} socket={this.props.socket} tokens={this.props.tokens} /> : null}


      </div>
    );
  }
}

export default withRouter(Grid);
