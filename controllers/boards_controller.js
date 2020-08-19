const Board = require('../models/Board');
const Game = require('../models/Game');
const User = require('../models/User');
const validateBoardRegister = require('../validations/board_validation');
const app = require('../app');
const { findById } = require('../models/User');

exports.fetchBoard = function (req, res) {
  const boardId = req.params.id;
  Board.findById(boardId, (err, board) => {
    if (!board) return res.json({ msg: 'no board found' });
    res.json(board);
  });
};

// board creating
exports.createBoard = function (req, res) {
  // check boards validations

  const { errors, isValid } = validateBoardRegister(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const gridSize = {
    rows: req.body.rows,
    cols: req.body.cols,
    gridZoomFactor: req.body.gridZoomFactor,
    gridPosX: req.body.gridPosX,
    gridPosY: req.body.gridPosY,
    width: req.body.gridWidth,
    height: req.body.gridHeight,
  };


  const imageAttributes = {
    imagePosX: req.body.imagePosX,
    imagePosY: req.body.imagePosY,
    imageZoomFactor: req.body.imageZoomFactor,
    width: req.body.backgroundWidth,
    height: req.body.backgroundHeight,
  };

  const settings = {
    gridColor: req.body.gridColor,
    opacity: req.body.opacity,
  };

  const newBoard = new Board({
    gameId: req.body.gameId,
    creatorId: req.body.creatorId,
    name: req.body.name,
    gridSize,
    backgroundImageUrl: req.file.location,
    imageAttributes,
    settings,
  });

  newBoard.save().then((board) => {
    app.transmitData(`${newBoard.gameId}`, 'boardCreated', board),
    addBoardToGame(board);
    res.status(200).json('created')
  });
};

function addBoardToGame(board) {
  Game.findById(board.gameId, (err, game) => {
    if (err) {
    //   console.log(err);
    } else if (!game) {
      console.log('game not found');
    } else {
      game.boards.push(board._id);
      game.save().then(console.log, console.log);
    }
  });
}

const updatedGame = (gameId, boardId) => { 
  Game.findById(gameId, (err, doc) => { 
    const idx = doc.boards.indexOf(boardId);
    doc.boards.splice(idx, 1);
    doc.save();
  });
};

// board deleting
exports.deleteBoard = function (board) {
  // find the board by id and delete it
  Board.findById(board._id, (err, result) => {
    if (result && result.remove()) {
      // transmits board.id
      updatedGame(result.gameId, board._id)
      app.transmitData(`${result.gameId}`, 'boardDeleted', board);
    } else {
      app.transmitData(`${result.gameId}`, 'error', err);
    }
  });
};




// update the board
exports.updateBoard = function (board) {
  // find the board by id and update it
  // needs to be changed to findOneAndUpdate

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
  
// create token
exports.createToken = function (token) {
  Board.findById(token.boardId, (err, board) => {
    if (board) {
      // const newToken = new Board.TokenSchema({... token})
      board.tokens.push(token);
      // why are we saving here and not updating above
      const updatedBoard = board.save()
        .then(() => app.transmitData(`${board.gameId}`, 'tokenUpdated', board.tokens[board.tokens.length - 1]));
    }else{
      throw err;
    }
  });
};

// edit token
// exports.editToken = function (token) {
//     //debugger
//     //find the board and update the token
//     //5ec07801dd806c1964996048
//     //Board.findOne({ _id: "5ebed3ef3dda9e104684bff1", "tokens._id": "5ec077cf92f9c218fd54fabe" }).then(console.log)
//     Board.findOneAndUpdate(
//         { _id: "5ebed3ef3dda9e104684bff1", "tokens._id": "5ec07801dd806c1964996048" },
//         {
//         "tokens.$": {
//             "pos": {
//                 "x": token.pos.x,
//                 "y": token.pos.y
//             },
//             "size": token.size,
//             "player": token.player
//         }
//     }, (err, doc) => {
//         debugger
//         if (doc) {
//             //returns updated token
//             const resToken = board.tokens.id(board.tokenId)
//             console.log(resToken)
//             //app.transmitData(`${board.gameId}`, 'tokenUpdated', resToken)
//         } else {
//             throw err
//         }
//     })
// }

exports.updateToken = function (token) {
  // find the board and update the token
  Board.findOne({ _id: token.boardId }, (err, res) => {
    if (res) {
      const editedToken = res.tokens.id(token._id);

      editedToken.name = token.name;
      editedToken.pos.x = token.pos.x;
      editedToken.pos.y = token.pos.y;
      editedToken.imageUrl = token.imageUrl;
      editedToken.player = token.player;
      editedToken.boardId = token.boardId;
      editedToken.pieceId = token.pieceId;

      res.save().then((res) => app.transmitData(`${res.gameId}`, 'tokenUpdated', res.tokens.id(token._id)));
    } else {
      throw err;
    }
  });
};

// delete token
exports.deleteToken = function (token) {
  // find the board by id and delete it
  Board.findOne({ _id: token.boardId }, (err, board) => {
    if (board) {
      board.tokens.id(token._id).remove();
      board.save();
      app.transmitData(`${board.gameId}`, 'tokenDeleted', token);
    } else {
      throw err;
    }
  });
};
