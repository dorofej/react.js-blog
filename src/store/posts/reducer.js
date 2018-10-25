/* eslint-disable import/first, no-unreachable */
const l = require('utils/log')(module);

import actions from './actions';

const initState = {
	posts: [],
	loading: false,
	success: false,
	error: false,
};


export default function postsReducer(
	state = initState,
	action
) {
	l();

	switch(action.type) {
		case actions.FETCH_POSTS_REQUEST:
			return {
				...state,
				...{ loading: true, success: false, error: false },
			};
		case actions.FETCH_POSTS_SUCCESS:
			return {
				...state,
				...{ posts: action.posts, loading: false, success: true, error: false },
			};
		case actions.FETCH_POSTS_FAILURE:
			return {
				...state,
				...{ loading: false, success: false, error: action.error },
			};
		default:
			return state;
	};
};
