# Virtual Tabletop

![Screen Capture](https://i.imgur.com/qUJhHTm.png)

Virtual Tabletop is a sandbox to simulate grid-based tabletop enviornments. A live version of the application can be found [here](https://virtualtabletop.herokuapp.com/). This app is still a work-in-progress but has working CRUD operations along with the use of websockets and image upload to AWS. This project was created by Dias Iskrayev, Dillon Rice, Steven Touba, and Wayne Su.

The project was built with the MERN stack and uses a combination of API calls and websockets to update the game players of changes to the game in real time. Examples of how user actions flow from the frontend to the backend are included below.

![Action Flow](https://i.imgur.com/Ov2BxIm.png)



## Installation

Use the package manager [npm](https://pip.pypa.io/en/stable/) to install foobar.

```bash
npm install
npm start
cd frontend
npm install
npm start
```


You will need to add your own keys for the AWS and MongoDB integration. Please see the config folder.

This project uses:
  * aws-sdk
  * axios
  * bcryptjs
  * body-parser
  * concurrently
  * express
  * form-data
  * jsonwebtoken
  * jwt-decode
  * mongoose
  * multer
  * multer-s3
  * node-sass
  * passport
  * passport-jwt
  * react
  * react-dom
  * react-icons
  * react-redux
  * react-router-dom
  * react-scripts
  * redux
  * redux-logger
  * redux-thunk
  * rpg-awesome
  * socket.io
  * socket.io-client
  * validator
  * [RPG-Awesome Icons](https://nagoshiashumari.github.io/Rpg-Awesome/)
  * Webpack CSS Loader
  * Sass

## Usage

To create an account use the "Sign up" button on the splash page. Upon successful account creation you will be redirected to your user page where you can create games and upload pieces. You may click "Create Game" to start a new game. You will be taken to the game view where you can create game boards and overlay a grid on top of them. You can adjust the size of the grid to match any gridlines that appear in the background image. After you create a board you will be able to place pieces on the board and change their position. The position changes (or any changes to the game for that matter) are then communicated through websockets to all other players. You can also change the current board.

Your game state will be posted to the server after every change.

## Websockets

This applications makes use of websockets to recieve and transmit changes to the game state. When there is an update to the board, for example, the user makes the changes through the ui. When they click "update board", our game client creates an updated board object and transmits it back through the websocked that was set up for the game room. The changes are routed to the boards controller where they are posted to the database and then returned back through the websocket to all of the users who are currently subscribed to the game room's socket.

The user is first subscribed to the game room when they enter the room
```client.jsx
  socket.on('connect', () => {
      socket.emit('joinRoom', { roomId });
    });
```

When the user makes a change to the board, those changes are saved to the "newBoard" object and then sent through the websocket to the server.
  ```grid.jsx
  updateBoard() {
    this.fetchUser = true;
    const newBoard = {};

    const gridSize = {};
    const imageAttributes = {};
    const settings = {};

    gridSize.gridPosX = this.gridPosX;
    gridSize.gridPosY = this.gridPosY;
    gridSize.width = this.gridWidthSetting;
    gridSize.height = this.gridHeightSetting;
    gridSize.cols = this.state.col;
    gridSize.rows = this.state.row;

    imageAttributes.imagePosX = this.imagePosX;
    imageAttributes.imagePosY = this.imagePosY;
    imageAttributes.width = this.backgroundWidthSetting;
    imageAttributes.height = this.backgroundHeightSetting;
    imageAttributes.imageZoomFactor = this.zoomBackground;

    settings.gridColor = this.borderColor;
    settings.opacity = this.borderOpacity;

    newBoard._id = this.props.board._id;
    if (this.state.name.length !== 0) {
      newBoard.name = this.state.name;
    } else {
      newBoard.name = 'New Board';
    }
    newBoard.gridSize = gridSize;
    newBoard.imageAttributes = imageAttributes;
    newBoard.settings = settings;
    newBoard.color = this.myColor;
    newBoard.userId = this.props.userId;


    this.props.socket.emit('updateBoard', newBoard);
  }
```

Server side, the user has already been subscribed to a socket with the same id as the game. The server recieves the "updateBoard" action from the websocket and calls the updateBoard function in the board controller
```app.js
        const nsp = io.of('/gamesNamespace');
        nsp.on('connection', (socket) => {
          socket.on('joinRoom', (room) => {
            socket.join(room.roomId);

          });
        ...
        // expected input format: send board
          socket.on('updateBoard', (board) => {
            boardController.updateBoard(board);
          });

```

The boards controller recieves the change, post the change to the database, and then transmits the "boardUpdated" action back through the websocket.
```boards_controller.js
// update the board
exports.updateBoard = function (board) {
  // find the board by id and update it

  User.findById(board.userId, (err, doc)=>{
    doc.color = board.color;
    doc.save()
      .then((user) => {
        delete board["color"]
        Board.findByIdAndUpdate(board._id, board, {
          new: true
        }, (err, result) => {
          if (result) {
            // returns board document = result may need .toJSON()
            app.transmitData(`${result.gameId}`, 'boardUpdated', { result, user } );
          } else {
            // console.log(err)
            app.transmitData(`${board.gameId}`, 'error', err);
          }
        });
      });
  });
};
```

A listening function has been initialized in the client. When it recieves "boardUpdated" from the sockets, it dispatches the changes to the redux store and re-renders the page with the changes.

```client.jsx
socket.on('boardUpdated', (payload) => {
  const { history, receiveBoard, receiveUserInfo } = this.props;

  receiveUserInfo(payload.user);
  receiveBoard(payload.result);

  this.setState({ update: true });
});

```

Now all of our users continue to stay in-sync. 

## Contributing
Contributions to the project are currently closed, but we are considering opening them in the future. If you would like to make a contribution please email Dillon Rice - dillon.m.rice@gmail.com
