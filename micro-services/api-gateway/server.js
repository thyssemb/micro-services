const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const tchatRoutes = require('./routes/tchatRoutes');

dotenv.config();

const app = express();
const PORT = 8080;

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

app.use('/api/messages', tchatRoutes);

app.use(authRoutes);
app.listen(PORT, () => {
    console.log(`API Gateway listening on port ${PORT}`);
});
