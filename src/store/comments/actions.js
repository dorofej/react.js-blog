export const FETCH_COMMENTS_REQUEST = 'FETCH_COMMENTS_REQUEST';
export const FETCH_COMMENTS_SUCCESS = 'FETCH_COMMENTS_SUCCESS';
export const FETCH_COMMENTS_FAILURE = 'FETCH_COMMENTS_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const fetchComments = (postId) => {
  return {
    type: FETCH_COMMENTS_REQUEST,
    postId,
  };
};

export const fetchCommentsSuccess = (comments) => {
  return {
    type: FETCH_COMMENTS_SUCCESS,
    comments,
  };
};

export const  fetchCommentsFailure = (error) => {
  return {
    type: FETCH_COMMENTS_FAILURE,
    error,
  };
};

export const addComment = (body) => {
  return {
    type: ADD_COMMENT_REQUEST,
    body,
  };
};

export const addCommentSuccess = (comment) => {
  return {
    type: ADD_COMMENT_SUCCESS,
    comment,
  };
};

export const addCommentFailure = (error) => {
  return {
    type: ADD_COMMENT_FAILURE,
    error,
  };
};
