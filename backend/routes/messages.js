import express from 'express';
import { getMessages } from '../db/messages.js';

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

export default router;