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
  FETCH_POSTS_REQUEST,
  fetchPostsSuccess,
  fetchPostsFailure,
} from './actions';

const fetchPosts = () => callApi('posts');

function* watchPostsFetching(action) {
  l();

  try {
    const posts = yield call(fetchPosts);

    if (Array.isArray(posts)) {
      yield put(fetchPostsSuccess(posts));
    } else {
      yield put(fetchPostsFailure(posts));
    };
  } catch(error) {
    yield put(fetchPostsFailure(error));
  };
};

export default function* rootSaga() {
  l();

  yield all([
    takeLatest(FETCH_POSTS_REQUEST, watchPostsFetching),
  ]);
};
