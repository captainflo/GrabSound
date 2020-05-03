const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define our model
const playlistSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'users' },
  sounds: [{ type: Schema.Types.ObjectId, ref: 'music' }],
});

// Create the model class
const ModelClass = mongoose.model('playlist', playlistSchema);

// Export the model
module.exports = ModelClass;
