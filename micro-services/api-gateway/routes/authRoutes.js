require('dotenv').config();
const express = require('express');
const makeRequest = require('../utils/httpClient');
const router = express.Router();

const app = express();
app.use(express.json());

const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_PORT;

router.post('/register', async (req, res) => {
    console.log("Request received at /register, forwarding to auth-service");

    try {
        const response = await makeRequest('POST', "http://localhost:8081/register", req.body);
        console.log('Response from auth-service:', response.data);
        res.status(response.status).json(response.data);
    } catch (error) {
        console.error('Error forwarding request to auth-service:', error.message);
        res.status(500).json({ message: 'Error communicating register route to the auth service' });
    }
});

// login route
router.post('/login', async (req, res) => {
    console.log("Request received at /login, forwarding to auth-service");

    try {
        const response = await makeRequest('POST', "http://localhost:8081/login", req.body);
        res.status(response.status).json(response.data);
    } catch (error) {
        console.error('Error forwarding request to auth-service:', error.message);
        res.status(500).json({ message: 'Identifiants incorrects' });
    }
});

// crud user
router.put('/update-profile', async (req, res) => {
    console.log("Request received at /update-profile, forwarding to auth-service");

    const token = req.headers.authorization?.split(' ')[1];

    console.log("Token extracted from authorization header:", token);

    if (!token) {
        return res.status(401).json({ message: 'Missing or invalid token' });
    }

    try {
        const response = await makeRequest(
            'PUT',
            "http://localhost:8081/update-profile",
            req.body,
            { Authorization: `Bearer ${token}` }
        );
        console.log('Response from auth-service:', response.data);
        console.log('Req body:', req.body);
        res.status(response.status).json(response.data);
    } catch (error) {
        console.error('Error forwarding request to auth-service:', error.message);
        res.status(500).json({ message: 'Error communicating update-profile route to the auth service' });
    }
});

module.exports = router;
