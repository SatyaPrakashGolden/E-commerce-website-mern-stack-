const jwt = require("jsonwebtoken");
const JWT_SECRET = "secret123";

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token || !token.startsWith("Bearer ")) {
    return res.status(403).json({ msg: 'Not authorized. No token' });
  }
  const tokenWithoutBearer = token.split(' ')[1];
  jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET, (err, data) => {
    if (err) {
      return res.status(403).json({ msg: 'Wrong or expired token.' });
    } else {
      req.user = data; 
      next();
    }
  });
};

module.exports = verifyToken;
