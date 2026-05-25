import cors from 'cors';
import express from 'express';

import messageRouter from './routes/messages.js';

const app = express();

// const cors = require('cors');

app.use(cors());
app.use(express.json());

// const messageRouter = require('./messages');
app.use('/messages', messageRouter);

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
});
