const Board = require('../models/Board');
const validateBoardRegister = require('../validations/board_validation');
const awsInterface = require('../config/aws_interface')
const app = require('../app') 


//board creating
exports.createBoard = function (req, res) {
    //check boards validations

    
    // const {errors,isValid} = validateBoardRegister(req.body);
    
    // if (!isValid) {
    //     return res.status(400).json(errors);
    // }
       
    
    return awsInterface.uploadImage(req.file.path, "vtboardimages")
    .then((location)=> {

            let gridSize = {
                rows: req.body.rows,
                cols: req.body.cols,
                gridZoomFactor: req.body.gridZoomFactor
            };


            let imageAttributes = {
                offsetX: req.body.offsetX,
                offsetY: req.body.offsetY,
                imageZoomFactor: req.body.imageZoomFactor
            }

            let settings={ 
                gridColor: req.body.gridColor,
                opacity: req.body.opacity,
            }


            const newBoard = new Board({
                gameId: req.body.gameId,
                name: req.body.name,
                gridSize: gridSize,
                backgroundImageUrl: location,
                imageAttributes: imageAttributes,
                settings: settings
            })

            console.log(newBoard)
            return newBoard.save().then(board => {
                app.transmitData(`${newBoard.gameId}`, 'boardCreated', board)
            });
        })
        .catch((err) => console.log(err))
    

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

