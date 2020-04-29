// prod.js - production keys here!!!
module.exports = {
  googleClientID: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  mongoURI: process.env.MONGO_URI,
  cookieKey: process.env.COOKIE_KEY,
  secret: process.env.SECRET,
  siteUrl: process.env.SITE_URL,
  cloudinaryClientName: process.env.CLOUDINARY_NAME,
  cloudinaryClientID: process.env.CLOUDINARY_CLIENT_ID,
  cloudinaryClientSecret: process.env.CLOUDINARY_CLIENT_SECRET,
  stripePublishablekey: process.env.STRIPE_PUBLISHABLE_KEY,
  stripeSecretkey: process.env.STRIPE_SECRET_KEY,
};
