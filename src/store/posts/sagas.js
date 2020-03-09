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
  yield all([
    takeLatest(FETCH_POSTS_REQUEST, watchPostsFetching),
  ]);
};
