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


const fetchUser = (id) => callApi(`users/${id}`);

function* watchUserFetching(action) {
	l();

	try {
		const user = yield call(fetchUser, action.id);

		if (user.name) {
			yield put(actions.fetchUserSuccess(user));
		} else {
			yield put(actions.fetchUserFailure(user));
		};
	} catch(error) {
		yield put(actions.fetchUserFailure(error));
	};
};

export default function* rootSaga() {
	l();

	yield all([
		takeLatest(actions.FETCH_USER_REQUEST, watchUserFetching),
	]);
};
