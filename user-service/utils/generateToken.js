const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,        // User ID
      name: user.name,     // User name (should be passed from the database)
      email: user.email    // User email (optional, but useful for token)
    },
    process.env.JWT_SECRET,
    { expiresIn: '30d' }  // Expiry time
  );
};

module.exports = generateToken;
