import {
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAILURE,
} from './actions';

const initState = {
  posts: [],
  loading: false,
  success: false,
  error: false,
};

export default function postsReducer(
  state = initState,
  action
) {
  switch(action.type) {
    case FETCH_POSTS_REQUEST:
      return {
        ...state,
        ...{ loading: true, success: false, error: false },
      };
    case FETCH_POSTS_SUCCESS:
      return {
        ...state,
        ...{ posts: action.posts, loading: false, success: true, error: false },
      };
    case FETCH_POSTS_FAILURE:
      return {
        ...state,
        ...{ loading: false, success: false, error: action.error },
      };
    default:
      return state;
  };
};
