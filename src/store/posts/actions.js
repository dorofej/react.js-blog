/* eslint-disable import/first */
const l = require('../../utils/log')(module);

export const FETCH_POSTS_REQUEST = 'FETCH_POSTS_REQUEST';
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const FETCH_POSTS_FAILURE = 'FETCH_POSTS_FAILURE';

export const fetchPosts = () => {
  l();

  return {
    type: FETCH_POSTS_REQUEST,
  };
};

export const fetchPostsSuccess = (posts) => {
  l();

  return {
    type: FETCH_POSTS_SUCCESS,
    posts,
  };
};

export const fetchPostsFailure = (error) => {
  l();

  return {
    type: FETCH_POSTS_FAILURE,
    error,
  };
};
