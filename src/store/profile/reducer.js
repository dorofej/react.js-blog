import {
  FETCH_PROFILE_REQUEST,
  FETCH_PROFILE_SUCCESS,
  FETCH_PROFILE_FAILURE,
} from './actions';

const initState = {
  user: null,
  loading: true,
  success: false,
  error: false,
};

export default function profileReducer(
  state = initState,
  action
) {
  switch(action.type) {
    case FETCH_PROFILE_REQUEST:
      return { ...initState };
    case FETCH_PROFILE_SUCCESS:
      return {
        ...initState,
        ...{ user: action.user, success: true, loading: false },
      };
    case FETCH_PROFILE_FAILURE:
      return {
        ...initState,
        ...{ error: action.error, loading: false },
      };
    default:
      return state;
  };
};
