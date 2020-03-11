import { delay } from 'redux-saga';
import { all, takeLatest, put, call } from 'redux-saga/effects';

import callApi from '../../libs/callApi';
import {
  FETCH_PROFILE_REQUEST,
  fetchProfileSuccess,
  fetchProfileFailure,
} from './actions';

const fetchProfile = () => callApi(`profile`);

function* watchProfileFetching(action) {
  try {
    const user = yield call(fetchProfile);
    yield delay(500);
    if (user) {
      yield put(fetchProfileSuccess(user));
    } else {
      yield put(fetchProfileFailure(user));
    };
  } catch(error) {
    yield put(fetchProfileFailure(error));
  };
};

export default function* rootSaga() {
  yield all([
    takeLatest(FETCH_PROFILE_REQUEST, watchProfileFetching),
  ]);
};
