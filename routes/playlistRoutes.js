const Playlist = require('../controllers/playlist');

module.exports = (app) => {
  // create Playlist
  app.post('/api/playlist/create', Playlist.createPlaylist);
  // Get PlaylistSound by User
  app.post('/api/playlist/user/:id', Playlist.getSoundPlaylist);
};
