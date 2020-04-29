const keys = require('../config/keys');
var stripe = require('stripe')(keys.stripeSecretkey);

module.exports = (app) => {
  app.post('/api/stripe', async (req, res) => {
    const money = req.body.form.total;

    const charge = await stripe.charges.create({
      amount: money,
      currency: 'usd',
      description: 'license music',
      source: req.body.token.id,
    });
    console.log(charge);
    res.send(charge);
  });
};
