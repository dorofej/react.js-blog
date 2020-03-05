/* eslint-disable import/first */
const l = require('../../utils/log')(module);

export const FETCH_COMMENTS_REQUEST = 'FETCH_COMMENTS_REQUEST';
export const FETCH_COMMENTS_SUCCESS = 'FETCH_COMMENTS_SUCCESS';
export const FETCH_COMMENTS_FAILURE = 'FETCH_COMMENTS_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const fetchComments = (postId) => {
  l();

  return {
    type: FETCH_COMMENTS_REQUEST,
    postId,
  };
};

export const fetchCommentsSuccess = (comments) => {
  l();

  return {
    type: FETCH_COMMENTS_SUCCESS,
    comments,
  };
};

export const  fetchCommentsFailure = (error) => {
  l();

  return {
    type: FETCH_COMMENTS_FAILURE,
    error,
  };
};

export const addComment = (body) => {
  l();

  return {
    type: ADD_COMMENT_REQUEST,
    body,
  };
};

export const addCommentSuccess = (comment) => {
  l();

  return {
    type: ADD_COMMENT_SUCCESS,
    comment,
  };
};

export const addCommentFailure = (error) => {
  l();

  return {
    type: ADD_COMMENT_FAILURE,
    error,
  };
};
