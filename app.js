const express = require("express");
const app = express();
const db = require("./config/keys").mongoURI;
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const passport = require('passport');

const users = require('./routes/api/users');
const games = require('./routes/api/games');
const boards = require('./routes/api/boards');
const pieces = require('./routes/api/pieces');
const boardController = require('./controllers/boards_controller')
const path = require('path');


const http = require("http");
const server = http.createServer(app);
const socketIo = require("socket.io");
const io = socketIo(server);




mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

app.use(passport.initialize()); 
require('./config/passport')(passport); 

app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json()); 

app.use('/api/users', users);
app.use('/api/games', games);
app.use('/api/boards', boards);
app.use('/api/pieces', pieces);


if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/build"));
  app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });

}


const port = process.env.PORT || 5000;



const nsp = io.of('/gamesNamespace');
nsp.on('connection', function(socket){
  socket.on('joinRoom', (room) => {
    // console.log(room)
    socket.join(room.roomId);
    console.log(`joined ${room.roomId}`)

    //socket.broadcast.to(room.roomId).emit('action', {test: "a test"});
    //nsp.to('304i3049').emit('action', {test: "a test"})
  }) 

  // exppected input format: { id: "some_id_string_here"}
  socket.on("deleteBoard", (board) => {
    boardController.deleteBoard(board)
  })

  // expected input format: send board
  socket.on("updateBoard", (board) => {
    boardController.updateBoard(board)
  })

  //expected input format: { boardId: "some_id_string_here", pos: { x: num, y: num}, 
  //size: num (optional), pieceId: "some_id string", imageUrl: "string", playerId: 
  //"playerId" }
  socket.on("createToken", (token) => {
    boardController.createBoard(token)
  })

  //expected input format: { boardId: "string", tokenId: "string", pos: {x: num, y: "num" } }
  socket.on("editToken", (token) => {
    boardController.editToken(token)
  })

  //expected input format { boardId: "string", tokenId: "string"}
  socket.on("deleteToken", (token) => {
    boardController.deleteToken(token)
  })
});


exports.transmitData = function (room, actionName, action) {
  // console.log(room, actionName, action)
  return nsp.to(room).emit(actionName, action)
  //return nsp.to(room).emit(actionName, action)
 };

 //socket.broadcast.emit('tokenMoved', move)

// dias's websocket code
// io.on("connection", socket => {
//   console.log("New client connected");

//   //Here we listen on a new namespace called "incoming data"
//   socket.on("move", (move) => {
//     // console.log(move)
//     socket.broadcast.emit('tokenMoved', move)
//   });

//   socket.on("createBoard", (board) => {
//     console.log(board.backgroundImage)
//    const res = boardsController.createBoard(board)
//       socket.broadcast.emit('boardCreated', res)
//   })
  
 
//   //A special namespace "disconnect" for when a client disconnects
//   socket.on("disconnect", () => console.log("Client disconnected"));
// });

// app.listen(port, () => console.log(`list ening on port ${port}`));
// boardController.editToken({ tokenId:'5ec077d81b21e81926c14db2', boardId: '5ebed3ef3dda9e104684bff1', pos: {x: 10, y:10}, imageUrl: 'www.google.com', pieceId: '5ebca6cfa2af7e68e47030aa'})
server.listen(port, () => console.log(`Listening on port ${port}`));
