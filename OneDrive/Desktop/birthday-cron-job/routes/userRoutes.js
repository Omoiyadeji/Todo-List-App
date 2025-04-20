const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', (req, res) => {
  res.sendFile('index.html', { root: './public' });
});

router.post('/api/users', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;