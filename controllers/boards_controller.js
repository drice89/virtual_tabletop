const Board = require('../models/Board');
const validateBoardRegister = require('../validations/board_validation');
const awsInterface = require('../config/aws_interface')
const transmitData = require('../app.js').transmitData 


//board creating
exports.createBoard = function (req, res) {
    console.log("hello from boardController")
    //check boards validations
    const {errors,isValid} = validateBoardRegister(req.body);
    
    if (!isValid) {
        return res.status(400).json(errors);
    }
    debugger
    console.log(req.body) 
    //create new board
    const newBoard = new Board({
        gameId: req.body.gameId,
        name: req.body.name,
        gridSize: req.body.gridSize,
        backgroundImageUrl: awsInterface.uploadImage(req.body.backgroundImage, "vtboardimages"),
        imageAttributes: req.body.imageAttributes,
        settings: req.body.settings
    })
    debugger
    //save to the database
    transmitData(`${newBoard.gameId}`, 'createBoard', newBoard.save());

     //newBoard.save().then(board => res.json(board), err => res.json(err))
}
 

//board deleting
exports.deleteBoard = function (req, res) {

    //find the board by id and delete it
    Board.findById(req.params.id)
        .then(board => res.json(board.remove()))
        .catch(err => res.json(err))
   
}

//update the board
exports.updateBoard = function (req, res) {

    //find the board by id and update it
    Board.findById(req.params.id)
        .then(board => board.updateOne(req.body))
        .catch(err => res.json(err))
   
}

//create token
exports.createToken = function (req, res) {
    Board.findOne({_id: req.params.boardId})
        .then(board => {
          board.tokens.push(req.body)
          board.save()
          res.json(board)
        })
        .catch(err => res.json(err))
   
}

//edit token
exports.editToken = function (req, res) {

    //find the board and update the token
    Board.findOneAndUpdate(
        { _id: req.params.boardId, "tokens._id": req.params.tokenId }, 
        {
        "tokens.$": {
            "pos": {
                "x": req.body.pos.x,
                "y": req.body.pos.y
            },

            "size": req.body.size,

            "player": req.body.player
        }
    }, (err, doc) => res.json(doc))
}


//delete token
exports.deleteToken = function (req, res) {

    //find the board by id and delete it
    Board.findOne({_id: req.params.boardId})
        .then(board => {
            board.tokens.id(req.params.tokenId).remove()
            board.save()
            res.json(board)
        })
        .catch(err => res.json(err))
}

