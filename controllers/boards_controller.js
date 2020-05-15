const Board = require('../models/Board');
const validateBoardRegister = require('../validations/board_validation');
const awsInterface = require('../config/aws_interface')


//board creating
exports.createBoard = function (data) {
    //check boards validations
    console.log("hit controller", data)
    const {errors,isValid} = validateBoardRegister(data);
    
    if (!isValid) {
        console.log(errors)
        return errors
    }
    //create new board
    const newBoard = new Board({
        gameId: data.gameId,
        name: data.name,
        gridSize: data.gridSize,
        backgroundImageUrl: awsInterface.uploadImage(data.backgroundImage, "vtboardimages"),
        imageAttributes: data.imageAttributes,
        settings: data.settings
    })
    //save to the database 
    console.log(newBoard)
    return newBoard.save().then(console.log)
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

