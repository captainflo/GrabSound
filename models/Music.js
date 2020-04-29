const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define our model
const musicSchema = new Schema({
  name: String,
  singer: String,
  cover: String,
  musicSrc: String,
  genre: String,
});

// Create the model class
const ModelClass = mongoose.model('music', musicSchema);

// Export the model
module.exports = ModelClass;
