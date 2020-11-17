import axios from 'axios';

const serverAPI = axios.create({
    baseURL: process.env.API_URL || 'http://localhost:3000'
});

export { serverAPI };