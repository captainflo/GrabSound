const Music = require('../controllers/music');

module.exports = (app) => {
  // create Music
  app.post('/api/music/create', Music.createMusic);
  // all Music
  app.post('/api/all/music', Music.getAllMusic);
  // Music list by genre
  app.post('/api/music/list/:id', Music.getMusicByGenre);
};
