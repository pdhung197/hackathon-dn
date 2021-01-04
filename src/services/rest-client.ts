import axios from 'axios';

const restClient = axios.create({
  baseURL: 'http://27.71.235.200:8888',
  timeout: 10000,
  proxy: {
    host: '142.93.165.82',
    port: 8080,
    protocol: 'http',
  },
});

export default restClient;
