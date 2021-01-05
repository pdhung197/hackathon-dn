import axios from 'axios';

const restClient = axios.create({
  baseURL: 'https://covidverify.xyz',
  timeout: 10000,
});

export default restClient;
