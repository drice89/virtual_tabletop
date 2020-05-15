const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    }
  },
  backgroundImageUrl: {
    type: String,
    required: true
  },
  squareSize: {
    offsetX: {
      type: Number,
      required: true
    },
    offsetY: {
      type: Number,
      required: true
    },
    zoomFactor: {
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
  tokens: [{
    _id: {
      type: Schema.Types.ObjectId,
      required: true
    },

    pos: {
      x: {
        type: Number,
        required: true
      },
      y: {
        type: Number,
        required: true
      }
    },

    size: {
      type: Number,
      default: 1,
    },

    pieceId: {
      type: Schema.Types.ObjectId,
      required: true
    },

    imageUrl: {
      type: String,
      required: true
    },

    player: {
      type: Schema.Types.ObjectId
    }
  }]
});

module.exports = Board = mongoose.model("Board", BoardSchema);


