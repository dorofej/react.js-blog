/* eslint-disable import/first */
const l = require('utils/log')(module);

import { all } from 'redux-saga/effects';

import posts from './posts/sagas';
import comments from './comments/sagas';
import user from './user/sagas';


export default function* rootSaga() {
	l('ROOT SAGA');

	yield all([
		posts(),
		comments(),
		user(),
	]);
};
