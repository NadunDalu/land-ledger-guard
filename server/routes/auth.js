const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Login Route
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ msg: 'Please provide username and password' });
    }

    // Check for user
    const result = await db.query('SELECT * FROM admin WHERE user_name = $1', [username]);

    if (result.rows.length === 0) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const user = result.rows[0];

    // Validate password
    // The image details show a simple password.
    if (password !== user.password) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Return user info (excluding password)
    // Mapping DB columns to API response
    res.json({
      id: user.use_id,
      username: user.user_name,
      role: user.user_role,
      fullName: user.full_name
    });

    // Log Login
    try {
      await db.query(
        'INSERT INTO audit_logs ("user", action, details) VALUES ($1, $2, $3)',
        [user.user_name, 'LOGIN', `User ${user.user_name} logged in`]
      );
    } catch (logErr) {
      console.error('Logging failed:', logErr);
    }

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error: ' + err.message });
  }
});

// Logout Route
router.post('/logout', async (req, res) => {
  try {
    const { username } = req.body;
    if (username) {
      await db.query(
        'INSERT INTO audit_logs ("user", action, details) VALUES ($1, $2, $3)',
        [username, 'LOGOUT', `User ${username} logged out`]
      );
    }
    res.json({ msg: 'Logged out' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
