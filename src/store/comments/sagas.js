/* eslint-disable import/first */
const l = require('utils/log')(module);

import {
	all,
	takeLatest,
	takeEvery,
	put,
	call,
} from 'redux-saga/effects';

import callApi from 'libs/callApi';
import actions from './actions';


const fetchComments = (postId) => callApi(
	postId ? `comments?postId=${postId}` : 'comments'
);

const addComment = (body) => callApi('comments', 'POST', body);


function* watchCommentsFetching(action) {
	l();

	try {
		const comments = yield call(fetchComments, action.postId);

		if (Array.isArray(comments)) {
			yield put(actions.fetchCommentsSuccess(comments));
		} else {
			yield put(actions.fetchCommentsFailure(comments));
		};
	} catch(error) {
		yield put(actions.fetchCommentsFailure(error));
	};
};

function* watchCommentAdding(action) {
	l();

	try {
		const comment = yield call(addComment, action.body);

		if (comment.postId) {
			yield put(actions.addCommentSuccess(comment));
		} else {
			yield put(actions.addCommentFailure(comment));
		};
	} catch(error) {
		yield put(actions.addCommentFailure(error));
	};
};

export default function* rootSaga() {
	l();

	yield all([
		takeLatest(actions.FETCH_COMMENTS_REQUEST, watchCommentsFetching),
		takeEvery(actions.ADD_COMMENT_REQUEST, watchCommentAdding),
	]);
};
