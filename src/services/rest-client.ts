import axios from 'axios';

const restClient = axios.create({
  baseURL: 'http://27.71.235.200:8888',
  timeout: 10000,
});

export default restClient;
