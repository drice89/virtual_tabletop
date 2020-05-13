const mongoose = require('mongoose'); 
const Schema = mongoose.Schema; 

const GameSchema = new Schema({
  creatorId: {
    type: Schema.Types.ObjectId, 
    ref: 'User'
  }, 
  name: { 
    type: String, 
    required: true, 
    index: { unique: true },
    minlength: [3, 'Must be 3 or more characters']
  }, 
  description: { 
    type: String, 
  }, 
  backgroundImage: {
    type: String
  }, 
  players: [{ 
    type: Schema.Types.ObjectId,
    ref: 'User'
  }], 
  boards: [{ 
    type: Schema.Types.ObjectId,
    ref: 'Board'
  }], 
});

GameSchema.index({'creatorId': 1, 'name': 1}, { unique: true});

module.exports = Game = mongoose.model('Game', GameSchema); 