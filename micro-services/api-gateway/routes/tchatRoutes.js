const express = require('express');
const makeRequest = require('../utils/httpClient');
const router = express.Router();
const verifyToken = require('../middlewares/authMiddleware');

const TCHAT_SERVICE_URL = process.env.TCHAT_SERVICE_PORT;

// send message
router.post('/tchat/send-message', async (req, res) => {
    try {
        const token = req.headers.authorization;

        const response = await makeRequest(
            'post',
            "http://localhost:8082/send-message",
            req.body,
            { Authorization: token }
        );

        res.status(response.status).json(response.data);
    } catch (error) {
        console.error('Error forwarding request to tchat-service:', error.message);
        res.status(500).json({ message: 'Error communicating with the tchat service' });
    }
});

// delete message
router.delete('/delete-message', async (req, res) => {

    try {
        const { messageId } = req.body;

        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({ message: 'Token is missing' });
        }

        const response = await makeRequest(
            'delete',
            "http://localhost:8082/api/messages/delete-message",
            { messageId },
            { Authorization: token }
        );

        res.status(response.status).json(response.data);
    } catch (error) {
        console.error('Error forwarding request to tchat-service:', error.message);
        res.status(500).json({ message: 'Error communicating with the tchat service' });
    }
});

// edit message
router.put('/edit-message', verifyToken, async (req, res) => {

    try {
        const { messageId, content } = req.body;

        const token = req.headers.authorization;

        const response = await makeRequest(
            'put',
            "http://localhost:8082/api/messages/edit-message",
            { messageId, content },
            { Authorization: token }
        );

        res.status(response.status).json(response.data);
    } catch (error) {
        console.error('Error forwarding request to tchat-service:', error.message);
        res.status(500).json({ message: 'Error communicating with the tchat service' });
    }
});

module.exports = router;
