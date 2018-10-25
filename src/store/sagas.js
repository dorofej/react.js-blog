/* eslint-disable import/first */
const l = require('utils/log')(module);

import { all } from 'redux-saga/effects';

import posts from './posts/sagas';


export default function* rootSaga() {
	l('ROOT SAGA');

	yield all([
		posts(),
	]);
};
