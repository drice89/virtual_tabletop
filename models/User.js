const mongoose = require('mongoose'); 
const Schema = mongoose.Schema; 
// import PieceSchema from './Piece'

const PieceSchema = new Schema({
  uploaderId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true
  },
});


const UserSchema = new Schema({
  displayName: {
    type: String,
    required: true, 
    //index: { unique: true }, 
    minlength: [3, 'Must be 3 or more characters']
  },
  email: {
    type: String,
    required: true, 
    index: { unique: true }
  },
  password: {
    type: String,
    required: true, 
    minlength: [6, 'Must be 6 or more characters']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  profilePicture: {
    type: String,
    default: 'https://cdn.getstickerpack.com/storage/uploads/sticker-pack/pickle-rick-rick-and-morty/sticker_3.png?9aff3e41c31ab27d820e8d52d28aef43'
  }, 
  gameSubscriptions: [{
    type: Schema.Types.ObjectId,
    ref: 'Game'
  }],
  pieces: [PieceSchema]
})



module.exports = User = mongoose.model('User', UserSchema);