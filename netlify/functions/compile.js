const express = require('express');
const cors = require('cors');
const Axios = require('axios');

const app = express();
const PORT = 8000;

app.use(cors({
    origin: '*', // Allow requests from any origin
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization'
}));
app.use(express.json());

app.post('/compile', (req, res) => {
    const { code, language, input } = req.body;

    let data = {
        "language": language || "c",
        "version": "10.2.0",
        "files": [
            {
                "name": "main",
                "content": code
            }
        ],
        "stdin": input
    };

    let config = {
        method: 'post',
        url: 'https://emkc.org/api/v2/piston/execute',
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };

    Axios(config)
        .then((response) => {
            res.json(response.data.run);
        })
        .catch((error) => {
            if (error.response) {
                res.status(error.response.status).send(error.response.data);
            } else if (error.request) {
                res.status(500).send({ error: "No response from API" });
            } else {
                res.status(500).send({ error: error.message });
            }
        });
});

module.exports = app;
