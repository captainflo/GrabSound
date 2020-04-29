const Cloudinary = require('../controllers/cloudinary');

module.exports = (app) => {
  // delete Image
  app.post('/api/delete/image', Cloudinary.deleteImage);
  // delete audio
  app.post('/api/delete/audio', Cloudinary.deleteAudio);
};
