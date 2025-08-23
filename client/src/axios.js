import axios from 'axios';

const instance = axios.create({
  baseURL: '/api', // uses Vite proxy to forward to 5000
});

export default instance;
