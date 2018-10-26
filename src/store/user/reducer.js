/* eslint-disable import/first, no-unreachable */
const l = require('utils/log')(module);

import actions from './actions';

const initState = {
	user: null,
	loading: false,
	success: false,
	error: false,
};


export default function userReducer(
	state = initState,
	action
) {
	l();

	switch(action.type) {
		case actions.FETCH_USER_REQUEST:
			return {
				...initState,
				...{ loading: true },
			};
		case actions.FETCH_USER_SUCCESS:
			return {
				...initState,
				...{ user: action.user, success: true },
			};
		case actions.FETCH_USER_FAILURE:
			return {
				...initState,
				...{ error: action.error },
			};
		default:
			return state;
	};
};
