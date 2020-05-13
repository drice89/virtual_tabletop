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
app.listen(port, () => console.log(`listening on port ${port}`));

