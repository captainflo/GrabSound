const Playlist = require('../controllers/playlist');

module.exports = (app) => {
  // create Playlist
  app.post('/api/playlist/add', Playlist.addPlaylist);
  // Get PlaylistSound by User
  app.post('/api/playlist/user/:id', Playlist.getSoundPlaylist);
  // delete Playlist Sound
  app.post('/api/playlist/delete/:id', Playlist.deleteSoundPlaylist);
};
