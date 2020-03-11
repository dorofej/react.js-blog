import axios from 'axios';

const API_PREFIX = 'https://jsonplaceholder.typicode.com';

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
