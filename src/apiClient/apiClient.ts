import axios from 'axios';

export const config = { baseURL: 'http://localhost:8001/api' };

const apiClient = axios.create(config);

export default apiClient;
