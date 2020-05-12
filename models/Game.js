const mongoose = require('mongoose'); 
const Schema = mongoose.Schema; 

const GameSchema = new Schema({
  creatorId: {
    type: Schema.Types.ObjectId, 
    ref: 'users'
  }, 
  name: { 
    type: String, 
    required: true, 
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
    ref: 'users'
  }], 
  boards: [{ 
    type: Schema.Types.ObjectId,
    ref: 'boards'
  }], 
})

module.exports = Game = mongoose.model('Game', GameSchema); 