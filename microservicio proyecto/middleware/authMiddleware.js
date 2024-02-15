const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  let token = req.headers['authorization'];
  if (!token) {
    return res.status(403).send({ message: 'Se requiere un token para autenticación' });
  }

  if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).send({ message: 'Token inválido o expirado' });
  }
};

module.exports = verifyToken;