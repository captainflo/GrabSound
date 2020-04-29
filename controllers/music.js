const Music = require('../models/Music');

exports.createMusic = function (req, res, next) {
  const music = new Music({
    name: req.body.name,
    singer: req.body.singer,
    cover: req.body.cover,
    musicSrc: req.body.audio,
    genre: req.body.genre,
  });

  music.save(function (error, music) {
    if (error) {
      return next(error);
    }
    res.send(music);
  });
};

exports.getMusicByGenre = function (req, res, next) {
  console.log(req.params.id);
  if (req.params.id === 'All') {
    Music.find(function (error, music) {
      if (error) {
        return next(error);
      }
      res.send(music);
    });
  } else {
    Music.find({ genre: req.params.id }, function (error, music) {
      if (error) {
        return next(error);
      }
      res.send(music);
    });
  }
};

exports.getAllMusic = function (req, res, next) {
  Music.find(function (error, music) {
    if (error) {
      return next(error);
    }
    res.send(music);
  });
};

exports.editMusic = function (req, res, next) {
  // create Music
  Music.findByIdAndUpdate(req.params.id, req.body).then(function (user) {
    res.json(user);
  });
};

exports.deleteMusic = function (req, res, next) {
  Music.findByIdAndRemove(req.params.id)
    .then(function (user) {
      res.json(user);
    })
    .catch(function (err) {
      res.json(err);
    });
};
