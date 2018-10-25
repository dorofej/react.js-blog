/* eslint-disable import/first */
const l = require('utils/log')(module);


const actions = {
	FETCH_POSTS_REQUEST: 'FETCH_POSTS_REQUEST',
	FETCH_POSTS_SUCCESS: 'FETCH_POSTS_SUCCESS',
	FETCH_POSTS_FAILURE: 'FETCH_POSTS_FAILURE',

	fetchPosts: () => {
		l();

		return {
			type: actions.FETCH_POSTS_REQUEST,
		};
	},

	fetchPostsSuccess: (posts) => {
		l();

		return {
			type: actions.FETCH_POSTS_SUCCESS,
			posts,
		};
	},

	fetchPostsFailure: (error) => {
		l();

		return {
			type: actions.FETCH_POSTS_FAILURE,
			error,
		};
	},
};


export default actions;
