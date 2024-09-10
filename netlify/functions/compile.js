const express = require('express');
const cors = require('cors');
const Axios = require('axios');

const app = express();

app.use(cors({
    origin: '*', // Allow requests from any origin
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization'
}));
app.use(express.json()); // Middleware to parse JSON bodies

app.post('/compile', async (req, res) => {
    try {
        const { code, language, input } = req.body;

        const data = {
            language: language || 'c',
            version: '10.2.0',
            files: [{ name: 'main', content: code }],
            stdin: input
        };

        const response = await Axios.post('https://emkc.org/api/v2/piston/execute', data, {
            headers: { 'Content-Type': 'application/json' }
        });

        res.json(response.data.run);
    } catch (error) {
        console.error(error);
        res.status(error.response ? error.response.status : 500).json({ error: error.message });
    }
});

module.exports = app;
