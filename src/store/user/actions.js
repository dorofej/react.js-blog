/* eslint-disable import/first */
const l = require('utils/log')(module);


const actions = {
	FETCH_USER_REQUEST: 'FETCH_USER_REQUEST',
	FETCH_USER_SUCCESS: 'FETCH_USER_SUCCESS',
	FETCH_USER_FAILURE: 'FETCH_USER_FAILURE',

	fetchUser: (id) => {
		l();

		return {
			type: actions.FETCH_USER_REQUEST,
			id,
		};
	},

	fetchUserSuccess: (user) => {
		l();

		return {
			type: actions.FETCH_USER_SUCCESS,
			user,
		};
	},

	fetchUserFailure: (error) => {
		l();

		return {
			type: actions.FETCH_USER_FAILURE,
			error,
		};
	},
};


export default actions;
