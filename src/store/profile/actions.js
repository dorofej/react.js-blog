export const FETCH_PROFILE_REQUEST = 'FETCH_PROFILE_REQUEST';
export const FETCH_PROFILE_SUCCESS = 'FETCH_PROFILE_SUCCESS';
export const FETCH_PROFILE_FAILURE = 'FETCH_PROFILE_FAILURE';

export const fetchProfile = () => {
  return { type: FETCH_PROFILE_REQUEST };
};

export const fetchProfileSuccess = (user) => {
  return {
    type: FETCH_PROFILE_SUCCESS,
    user,
  };
};

export const fetchProfileFailure = (error) => {
  return {
    type: FETCH_PROFILE_FAILURE,
    error,
  };
};
