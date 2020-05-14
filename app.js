const express = require("express");
const app = express();
const db = require("./config/keys").mongoURI;
const mongoose = require("mongoose");
const bodyParser = require('body-parser'); 
const passport = require('passport'); 

const users = require('./routes/api/users'); 
const games = require('./routes/api/games');
const boards = require('./routes/api/boards')
const path = require('path');


const http = require("http");
const socketIo = require("socket.io");
const server = http.createServer(app);
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


if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/build"));
  app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });

}


const port = process.env.PORT || 5000;


io.on("connection", socket => {
  console.log("New client connected");

  //Here we listen on a new namespace called "incoming data"
  socket.on("move", (move) => {
    // console.log(move)
    socket.broadcast.emit('tokenMoved', move)
  });

  
 
  //A special namespace "disconnect" for when a client disconnects
  socket.on("disconnect", () => console.log("Client disconnected"));
});

// app.listen(port, () => console.log(`list ening on port ${port}`));
server.listen(port, () => console.log(`Listening on port ${port}`));

