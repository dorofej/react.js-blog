/* eslint-disable import/first, no-unreachable */
const l = require('../../utils/log')(module);

import {
  FETCH_COMMENTS_REQUEST,
  FETCH_COMMENTS_SUCCESS,
  FETCH_COMMENTS_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
} from './actions';

const initState = {
  comments: [],
  loading: false,
  success: false,
  error: false,
  addRequest: false,
  addSuccess: false,
  addError: false,
};

export default function commentsReducer(
  state = initState,
  action
) {
  l();

  switch(action.type) {
    case FETCH_COMMENTS_REQUEST:
      return {
        ...state,
        ...{ loading: true, success: false, error: false },
      };
    case FETCH_COMMENTS_SUCCESS:
      return {
        ...state,
        ...{ comments: action.comments, loading: false, success: true, error: false },
      };
    case FETCH_COMMENTS_FAILURE:
      return {
        ...state,
        ...{ loading: false, success: false, error: action.error },
      };

    case ADD_COMMENT_REQUEST:
      return {
        ...state,
        ...{ addRequest: true, addSuccess: false, addError: false },
      };
    case ADD_COMMENT_SUCCESS:
      return {
        ...state,
        ...{ addRequest: false, addSuccess: true, addError: false },
      };
    case ADD_COMMENT_FAILURE:
      return {
        ...state,
        ...{ addRequest: false, addSuccess: false, addError: action.error },
      };

    default:
      return state;
  };
};
