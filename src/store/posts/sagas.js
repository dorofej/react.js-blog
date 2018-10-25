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


const fetchPosts = () => callApi('posts');

function* watchPostsFetching(action) {
	l();

	try {
		const posts = yield call(fetchPosts);

		if (Array.isArray(posts)) {
			yield put(actions.fetchPostsSuccess(posts));
		} else {
			yield put(actions.fetchPostsFailure(posts));
		};
	} catch(error) {
		yield put(actions.fetchPostsFailure(error));
	};
};

export default function* rootSaga() {
	l();

	yield all([
		takeLatest(actions.FETCH_POSTS_REQUEST, watchPostsFetching),
	]);
};
