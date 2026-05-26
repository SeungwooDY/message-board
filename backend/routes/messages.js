import express from 'express';
import { getMessages, addMessage, deleteMessage, editMessage } from '../db/messages.js';

const router = express.Router();
//const { db } = require('../firebase');

router.get('/', async (req, res) => {
    try {
        const messages = await getMessages();
        res.json(messages);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch messages' });
    }
})

router.post('/upload', async (req, res) => {
    try {
        const { name, message } = req.body;
        await addMessage(name, message);
        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to upload message' });
    }
})

router.delete('/delete', async (req, res) => {
    try {
        const { id } = req.body;
        await deleteMessage(id);
        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete message' });
    }
})

router.put('/edit', async (req, res) => {
    try {
        const { id, edits } = req.body;
        await editMessage(id, edits);
        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to edit message' });
    }
})

export default router;