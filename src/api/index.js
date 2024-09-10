const express = require("express");
const cors = require("cors");
const Axios = require("axios");
const app = express();
const PORT = 8000;

// CORS configuration
const corsOptions = {
    origin: 'http://localhost:3000', // Replace with your actual frontend URL
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization'
};

app.use(cors(corsOptions)); // Enable CORS
app.use(express.json()); // Enable JSON parsing

app.post("/compile", (req, res) => {
    // Getting the required data from the request
    const { code, language, input } = req.body;

    // Create the payload for the API request
    let data = {
        "language": language || "c", // Default to C if no language is provided
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

    // Calling the code compilation API
    Axios(config)
        .then((response) => {
            res.json(response.data.run);  // Send the 'run' object from the response to the client
            console.log("API response data:", response.data);
        })
        .catch((error) => {
            if (error.response) {
                // The server responded with a status code outside of 2xx
                console.error("Error response data:", error.response.data);
                console.error("Error response status:", error.response.status);
                res.status(error.response.status).send(error.response.data);
            } else if (error.request) {
                // The request was made but no response was received
                console.error("No response received:", error.request);
                res.status(500).send({ error: "No response from API" });
            } else {
                // Error in setting up the request
                console.error("Request setup error:", error.message);
                res.status(500).send({ error: error.message });
            }
        });
});

// Start the server
app.listen(process.env.PORT || PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
