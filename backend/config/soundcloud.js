const axios = require('axios');
require('dotenv').config();

const clientId = process.env.SOUNDCLOUD_CLIENT_ID;
const baseUrl = 'https://api.soundcloud.com';

const getTrack = async (trackId) => {
    try {
        const response = await axios.get(`${baseUrl}/tracks/${trackId}`, {
            params: {
                client_id: clientId
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching track:', error);
        throw error;
    }
};

const searchTracks = async (query) => {
    try {
        const response = await axios.get(`${baseUrl}/tracks`, {
            params: {
                q: query,
                client_id: clientId
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error searching tracks:', error);
        throw error;
    }
};

module.exports = {
    getTrack,
    searchTracks
};