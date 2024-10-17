const express = require('express');
const stripe = require('stripe')('sk_test_51PwpETJ4ZkClCq3JVv4phXa3qAaHLW1ScJbF4cerK8hemLbVa3gCHZx5XIOJxpdA4VMDbQ127kUbYpuH2r3IboUM00a78x00Jx'); // Replace with your Stripe secret key
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/create-payment-intent', async (req, res) => {
  const { amount, currency } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,  // Amount in cents
      currency: currency, // Usually "usd" or "eur"
      payment_method_types: ['card'],
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));
