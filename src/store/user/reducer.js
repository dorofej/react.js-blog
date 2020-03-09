import {
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
} from './actions';

const initState = {
  user: null,
  loading: false,
  success: false,
  error: false,
};

export default function userReducer(
  state = initState,
  action
) {
  switch(action.type) {
    case FETCH_USER_REQUEST:
      return {
        ...initState,
        ...{ loading: true },
      };
    case FETCH_USER_SUCCESS:
      return {
        ...initState,
        ...{ user: action.user, success: true },
      };
    case FETCH_USER_FAILURE:
      return {
        ...initState,
        ...{ error: action.error },
      };
    default:
      return state;
  };
};
