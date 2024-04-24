const express = require('express');
const { User } = require('../model/user');

const router = express.Router();

router.use(express.json());

// Route to create a new user
router.post('/createUser', async (req, res) => {
  const { name, email, password, phone } = req.body;

  try {
    const newUser = await User.create({ name, email, password, phone });
    console.log('User created successfully');
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error creating user: ', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route for user login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email, password } });
    if (!user) {
      res.status(401).json({ error: 'Invalid email or password' });
    } else {
      res.status(200).json({ message: 'Login successful' });
    }
  } catch (error) {
    console.error('Error logging in: ', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
