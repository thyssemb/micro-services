const mongoose = require('mongoose');
const express = require('express');
const verifyToken = require('../middleware/tokenMiddleware');
const Message = require('../models/messages');
const {verify} = require("jsonwebtoken");
const router = express.Router();

// sending message
router.post('/send-message', verifyToken, async (req, res) => {
    const { content, pseudo } = req.body;
    const userId = req.userId;

    if (!content || !pseudo) {
        return res.status(400).json({ message: 'Message content and pseudo are required' });
    }

    try {
        const message = new Message({
            messageId: new mongoose.Types.ObjectId(),
            userId,
            content,
            pseudo,
            createdAt: new Date(),
        });

        await message.save();

        res.status(201).json({
            message: 'Message sent successfully',
            data: message,
        });
    } catch (error) {
        console.error('Error saving message:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// get messages
router.get('/messages', async (req, res) => {
    try {
        const messages = await Message.find()
            .populate('userId', 'pseudo')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            data: messages.map(msg => ({
                messageId: msg.messageId,
                pseudo: msg.pseudo,
                content: msg.content,
                createdAt: msg.createdAt,
            })),
        });
    } catch (error) {
        console.error('Error fetching messages:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// delete message
router.delete('/delete-message', verifyToken, async (req, res) => {
    const { messageId } = req.body;
    const userId = req.userId;

    try {
        if (!messageId) {
            return res.status(400).json({ message: "Message ID is required" });
        }

        const message = await Message.findOne({ messageId });

        if (!message) {
            return res.status(404).json({ message: "Message not found" });
        }

        if (message.userId.toString() !== userId.toString()) {
            return res.status(403).json({ message: "You are not authorized to delete this message" });
        }

        await Message.findByIdAndDelete(message._id);

        res.status(200).json({ message: "Message deleted successfully" });
    } catch (error) {
        console.error('Error deleting message:', error.message);
        res.status(500).json({ message: 'Error deleting the message' });
    }
});


// edit message
router.put('/edit-message', verifyToken, async (req, res) => {
    const { messageId, content } = req.body;
    const userId = req.userId;

    if (!messageId || !content) {
        return res.status(400).json({ message: "Message ID and content are required" });
    }

    try {
        const objectId = new mongoose.Types.ObjectId(messageId);

        const message = await Message.findOne({ messageId: objectId, userId });

        if (!message) {
            return res.status(404).json({ message: "Message not found or you are not authorized to edit this message" });
        }

        // Mettre à jour le contenu du message
        message.content = content;
        await message.save();

        res.status(200).json({ message: "Message edited successfully", data: message });
    } catch (error) {
        console.error("Error editing message:", error);
        res.status(500).json({ message: "Error editing the message" });
    }
});


module.exports = router;
