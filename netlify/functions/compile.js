const Axios = require('axios');

exports.handler = async function(event, context) {
    try {
        const { code, language, input } = JSON.parse(event.body);

        const data = {
            language: language || 'c',
            version: '10.2.0',
            files: [{ name: 'main', content: code }],
            stdin: input
        };

        const response = await Axios.post('https://emkc.org/api/v2/piston/execute', data, {
            headers: { 'Content-Type': 'application/json' }
        });

        return {
            statusCode: 200,
            body: JSON.stringify(response.data.run)
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: error.response ? error.response.status : 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};