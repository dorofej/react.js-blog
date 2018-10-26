/* eslint-disable import/first */
const l = require('utils/log')(module);

import {
	all,
	takeLatest,
	put,
	call,
} from 'redux-saga/effects';

import callApi from 'libs/callApi';
import actions from './actions';


const fetchComments = (postId) => callApi(
	postId ? `comments?postId=${postId}` : 'comments'
);

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

export default function* rootSaga() {
	l();

	yield all([
		takeLatest(actions.FETCH_COMMENTS_REQUEST, watchCommentsFetching),
	]);
};
