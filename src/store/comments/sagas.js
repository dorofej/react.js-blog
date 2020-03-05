/* eslint-disable import/first */
const l = require('../../utils/log')(module);

import {
  all,
  takeLatest,
  takeEvery,
  put,
  call,
} from 'redux-saga/effects';

import callApi from '../../libs/callApi';
import {
  FETCH_COMMENTS_REQUEST,
  ADD_COMMENT_REQUEST,
  fetchCommentsSuccess,
  fetchCommentsFailure,
  addCommentSuccess,
  addCommentFailure,
} from './actions';

const fetchComments = (postId) => callApi(
  postId ? `comments?postId=${postId}` : 'comments'
);

const addComment = (body) => callApi('comments', 'POST', body);

function* watchCommentsFetching(action) {
  l();

  try {
    const comments = yield call(fetchComments, action.postId);

    if (Array.isArray(comments)) {
      yield put(fetchCommentsSuccess(comments));
    } else {
      yield put(fetchCommentsFailure(comments));
    };
  } catch(error) {
    yield put(fetchCommentsFailure(error));
  };
};

function* watchCommentAdding(action) {
  l();

  try {
    const comment = yield call(addComment, action.body);

    if (comment.postId) {
      yield put(addCommentSuccess(comment));
    } else {
      yield put(addCommentFailure(comment));
    };
  } catch(error) {
    yield put(addCommentFailure(error));
  };
};

export default function* rootSaga() {
  l();

  yield all([
    takeLatest(FETCH_COMMENTS_REQUEST, watchCommentsFetching),
    takeEvery(ADD_COMMENT_REQUEST, watchCommentAdding),
  ]);
};
