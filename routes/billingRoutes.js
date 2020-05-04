const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretkey);
const Playlist = require('../models/Playlist');
const User = require('../models/User');

module.exports = (app) => {
  app.post('/api/stripe', async (req, res) => {
    const money = req.body.form.total;
    const user = req.body.form.userId;
    const sounds = req.body.form.musicId;
    const plan = req.body.form.plan;

    const charge = await stripe.charges.create({
      amount: money,
      currency: 'usd',
      description: 'license music',
      source: req.body.token.id,
    });

    const playlist = new Playlist({
      user: user,
      sounds: sounds,
    });

    if (plan.includes('Unlimited')) {
      console.log('user here');
      User.findByIdAndUpdate(user, { unlimited: true }).then(function (user) {
        res.send(user);
      });
    } else {
      // If Invidual plan
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
    }
  });
};
