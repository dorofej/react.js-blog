/* eslint-disable import/first */
const l = require('utils/log')(module);

const API_PREFIX = 'https://jsonplaceholder.typicode.com';

export default function callApi(
	endPoint,
	method = 'GET',
	body,
	headers = { 'Content-Type': 'application/json' }
) {
	l();

	return fetch(`${API_PREFIX}/${endPoint}`, {
		headers,
		method,
		body: JSON.stringify(body),
	})
		.then((response) => (response.json().then(json => ({ json, response }))))
		.then(({ json, response }) => {
			if (!response.ok) {
				return Promise.reject(json);
			};

			return json;
		})
		.then(
			(response) => { return response; },
			(error) => { throw error; }
		);
};
