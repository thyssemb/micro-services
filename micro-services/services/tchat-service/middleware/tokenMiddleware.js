require('dotenv').config();
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token is missing' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);


        console.log('Decoded token:', decoded);

        req.userId = decoded.id;
        next();
    } catch (error) {
        console.error('Error verifying token:', error.message);
        return res.status(403).json({ message: 'Invalid or expired token' });
    }
};

module.exports = verifyToken;
