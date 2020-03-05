/* eslint-disable import/first */
const l = require('../../utils/log')(module);

import {
  all,
  takeLatest,
  put,
  call,
} from 'redux-saga/effects';

import callApi from '../../libs/callApi';
import {
  FETCH_USER_REQUEST,
  fetchUserSuccess,
  fetchUserFailure,
} from './actions';

const fetchUser = (id) => callApi(`users/${id}`);

function* watchUserFetching(action) {
  l();

  try {
    const user = yield call(fetchUser, action.id);

    if (user.name) {
      yield put(fetchUserSuccess(user));
    } else {
      yield put(fetchUserFailure(user));
    };
  } catch(error) {
    yield put(fetchUserFailure(error));
  };
};

export default function* rootSaga() {
  l();

  yield all([
    takeLatest(FETCH_USER_REQUEST, watchUserFetching),
  ]);
};
