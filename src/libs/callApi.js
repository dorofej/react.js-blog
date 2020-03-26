import axios from 'axios';

let API_PREFIX = 'https://json-fake-api-server.herokuapp.com';
if (process.env.NODE_ENV === 'development') {
  API_PREFIX = 'http://localhost:3000'
};

/**
 * @param {string} route
 * @param {string} method
 * @param {*} data
 * @return {any}
 */
export default async function callApi(route, method = 'get', data) {
  const url = `${API_PREFIX}/${route}`;
  const response = await axios({ method, url, data });
  return response.data;
};
