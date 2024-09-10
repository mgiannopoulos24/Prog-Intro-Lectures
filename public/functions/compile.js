// netlify/functions/compile.js
const axios = require('axios');
const cors = require('cors');
const { parse } = require('querystring');

const corsMiddleware = cors({
    origin: 'https://progintrolectures.netlify.app', // Replace with your actual frontend URL
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization'
});

exports.handler = async function(event, context) {
    return new Promise((resolve, reject) => {
        corsMiddleware(event, context, async () => {
            if (event.httpMethod === 'POST') {
                try {
                    const body = JSON.parse(event.body);
                    const { code, language, input } = body;

                    const data = {
                        language: language || "c", // Default to C if no language is provided
                        version: "10.2.0",
                        files: [
                            {
                                name: "main",
                                content: code
                            }
                        ],
                        stdin: input
                    };

                    const config = {
                        method: 'post',
                        url: 'https://emkc.org/api/v2/piston/execute',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        data: data
                    };

                    const response = await axios(config);
                    resolve({
                        statusCode: 200,
                        body: JSON.stringify(response.data.run),
                    });
                } catch (error) {
                    if (error.response) {
                        resolve({
                            statusCode: error.response.status,
                            body: JSON.stringify(error.response.data),
                        });
                    } else if (error.request) {
                        resolve({
                            statusCode: 500,
                            body: JSON.stringify({ error: "No response from API" }),
                        });
                    } else {
                        resolve({
                            statusCode: 500,
                            body: JSON.stringify({ error: error.message }),
                        });
                    }
                }
            } else {
                resolve({
                    statusCode: 405,
                    body: JSON.stringify({ error: 'Method Not Allowed' }),
                });
            }
        });
    });
};
