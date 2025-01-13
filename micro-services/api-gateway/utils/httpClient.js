const axios = require('axios');

const makeRequest = async (method, url, data = {}, headers = {}) => {
    try {
        const response = await axios({ method, url, data, headers });
        return response;
    } catch (error) {
        console.error('Error during HTTP request:', error.message);
        throw error;
    }
};

module.exports = makeRequest;
