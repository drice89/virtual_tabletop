const Board = require('../models/Board');
const validateBoardRegister = require('../validations/board_validation');
const awsInterface = require('../config/aws_interface')
const app = require('../app') 



exports.fetchBoard = function(req, res) { 
    console.log('user is fetching')
  const boardId = req.params.id; 
  Board.findById(boardId, function(err, board) {
    if (!board) return res.json({msg: 'no board found'}); 
    res.json(board); 
  })
}

//board creating
exports.createBoard = function (req, res) {
    //check boards validations
    
    const {errors,isValid} = validateBoardRegister(req.body);
    
    if (!isValid) {
        return res.status(400).json(errors);
    }
       
    
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
                app.transmitData(`${newBoard.gameId}`, 'boardUpdated', board)
            });
        })
        .catch((err) => console.log(err))
    

     //newBoard.save().then(board => res.json(board), err => res.json(err))
}         
 

//board deleting
exports.deleteBoard = function (board) {

    //find the board by id and delete it
    Board.findById(board.id, (err, result) => {
        if(result && result.remove() ) {
            //transmits board.id
            app.transmitData(`${result.gameId}`, 'boardDeleted', board)
        } else {
            app.transmitData(`${result.gameId}`, 'error', err)
        }
    })
   
}

//update the board
exports.updateBoard = function (board) {

    //find the board by id and update it
    //needs to be changed to findOneAndUpdate
    Board.find(board.id, (err, result) => {
        if(result) {
            const updatedBoard = result.updateOne()
            //returns board document
            app.transmitData(`${result.gameId}`, 'boardUpdated', updatedBoard)
        } else {
            app.transmitData(`${board.gameId}`, 'error', err)
        }
    })
}

//create token
exports.createToken = function (token) {
    Board.findOne({_id: token.boardId} , (err, board) => {
        if(board) {
            board.tokens.push(req.body)
            //why are we saving here and not updating above
            const updatedBoard = board.save() 
            
            //returns entire board
            app.transmitData(`${updatedBoard.gameId}`, 'tokenUpdated', updatedBoard.tokens)
        } else {
            throw err
        }
    })
}

//edit token
exports.editToken = function (token) {

    //find the board and update the token
    Board.findOneAndUpdate(
        { _id: token.boardId, "tokens._id": token.tokenId }, 
        {
        "tokens.$": {
            "pos": {
                "x": token.pos.x,
                "y": token.pos.y
            },
            "size": token.size,
            "player": token.player
        }
    }, (err, board) => {
        if (board) {
            //returns updated token
            const resToken = board.tokens.id(board.tokenId)
            app.transmitData(`${board.gameId}`, 'tokenUpdated', resToken)
        } else {
            throw err
        }
    })
}


//delete token
exports.deleteToken = function (token) {
    //find the board by id and delete it
    Board.findOne({_id: token.boardId}, (err, board) => {
        if(board) {
            board.tokens.id(board.tokenId).remove()
            board.save()
            app.transmitData(`${board.gameId}`, 'tokenDeleted', token)
        } else {
            throw err
        }
    })
}

