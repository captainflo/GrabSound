const Playlist = require('../models/Playlist');

exports.createPlaylist = function (req, res, next) {
  const user = req.body.userId;
  const sounds = req.body.musicId;

  const playlist = new Playlist({
    user: user,
    sounds: req.body.musicId,
  });

  Playlist.findOne({ user: user }, function (error, existingPlaylist) {
    // if a playlist with userId does exist.
    if (existingPlaylist) {
      Playlist.findOneAndUpdate(
        { _id: existingPlaylist._id },
        { $push: { sounds: sounds } },
        { new: true }
      ).then((data) => {
        res.send(data);
      });
    } else {
      playlist.save(function (error, playlist) {
        if (error) {
          return next(error);
        }
        res.send(playlist);
      });
    }
  });
};

exports.getSoundPlaylist = function (req, res, next) {
  Playlist.findOne({ user: req.params.id })
    .populate('sounds')
    .exec(function (err, sounds) {
      res.send(sounds);
    });
};

exports.editPlaylist = function (req, res, next) {
  const playlistId = req.body.playlistId;
  const sounds = req.body.musicId;

  Playlist.findOneAndUpdate(
    { _id: playlistId },
    { $push: { sounds: sounds } },
    { new: true },
    function (error, playlist) {
      if (error) {
        return next(error);
      }
      res.send(playlist);
    }
  );
};
