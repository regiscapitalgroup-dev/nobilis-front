// helpers/apiClient.ts
import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'https://lf3566q8-8000.usw3.devtunnels.ms/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
