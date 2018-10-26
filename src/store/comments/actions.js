/* eslint-disable import/first */
const l = require('utils/log')(module);


const actions = {
	FETCH_COMMENTS_REQUEST: 'FETCH_COMMENTS_REQUEST',
	FETCH_COMMENTS_SUCCESS: 'FETCH_COMMENTS_SUCCESS',
	FETCH_COMMENTS_FAILURE: 'FETCH_COMMENTS_FAILURE',

	fetchComments: (postId) => {
		l();

		return {
			type: actions.FETCH_COMMENTS_REQUEST,
			postId,
		};
	},

	fetchCommentsSuccess: (comments) => {
		l();

		return {
			type: actions.FETCH_COMMENTS_SUCCESS,
			comments,
		};
	},

	fetchCommentsFailure: (error) => {
		l();

		return {
			type: actions.FETCH_COMMENTS_FAILURE,
			error,
		};
	},
};


export default actions;
