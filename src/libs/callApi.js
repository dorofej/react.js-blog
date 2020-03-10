import axios from 'axios';

const API_PREFIX = 'https://jsonplaceholder.typicode.com';

export default async function callApi(endPoint, method = 'get', data) {
  const url = `${API_PREFIX}/${endPoint}`;
  const response = await axios({ method, url, data });
  return response.data;
};
