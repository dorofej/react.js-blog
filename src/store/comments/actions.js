/* eslint-disable import/first */
const l = require('utils/log')(module);


const actions = {
	FETCH_COMMENTS_REQUEST: 'FETCH_COMMENTS_REQUEST',
	FETCH_COMMENTS_SUCCESS: 'FETCH_COMMENTS_SUCCESS',
	FETCH_COMMENTS_FAILURE: 'FETCH_COMMENTS_FAILURE',

	ADD_COMMENT_REQUEST: 'ADD_COMMENT_REQUEST',
	ADD_COMMENT_SUCCESS: 'ADD_COMMENT_SUCCESS',
	ADD_COMMENT_FAILURE: 'ADD_COMMENT_FAILURE',

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

	addComment: (body) => {
		l();

		return {
			type: actions.ADD_COMMENT_REQUEST,
			body,
		};
	},

	addCommentSuccess: (comment) => {
		l();

		return {
			type: actions.ADD_COMMENT_SUCCESS,
			comment,
		};
	},

	addCommentFailure: (error) => {
		l();

		return {
			type: actions.ADD_COMMENT_FAILURE,
			error,
		};
	},
};


export default actions;
