const jwt = require('jsonwebtoken');
exports.verifyToken = (req, res) => {
    const token = req.headers['jwt_token'];
    if (!token) {
        return res.status(403).send({ message: 'No token provided.' });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: 'Unauthorized!' });
        }
        res.status(200).send({ valid: true });
    });
};
