const jwt = require("jsonwebtoken");
const secret_key = process.env.SECRET_KEY;

function verifyToken(req, res, next) {
  const authHeader = req.header("Authorization");
  const splitHeader = authHeader.split(" ");

  const token = splitHeader[1];

  if (!token) return res.status(401).json({ error: "Access denied" });
  try {
    const decoded = jwt.verify(token, secret_key);
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
}

module.exports = verifyToken;
