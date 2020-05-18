const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TokenSchema = new Schema({
    pos: {
      x: {
        type: Number,
        //required: true
      },
      y: {
        type: Number,
        //required: true
      }
    },

    size: {
      type: Number,
      default: 1,
    },

    imageUrl: {
      type: String,
      //required: true
    },

    pieceId: {
      type: Schema.Types.ObjectId,
      //required: true,
      ref: 'Piece'
    },

    boardId: {
      type: Schema.Types.ObjectId,
      //required: true,
      ref: 'Board'
    },

    player: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
})

const BoardSchema = new Schema({
  gameId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  name: {
    type: String,
    required: true,
    minlength: [3, 'Must be 3 or more characters']
  },
  gridSize: {
    rows: {
      type: Number,
      required: true
    },
    cols: {
      type: Number,
      required: true
    },
    gridZoomFactor: {
      type: Number
    }
  },
  backgroundImageUrl: {
    type: String,
  },
  imageAttributes: {
    offsetX: {
      type: Number,
      required: true
    },
    offsetY: {
      type: Number,
      required: true
    },
    imageZoomFactor: {
      type: Number,
      required: true
    }
  },
  settings: {
    gridColor: {
      type: String,
      default: '#808080'
    },
    opacity: {
      type: {
        min: 0,
        max: 1
      },
      default: 1
    }
  },
  tokens: [TokenSchema]
});

module.exports = Board = mongoose.model("Board", BoardSchema);


