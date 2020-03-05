/* eslint-disable import/first */
const l = require('../../utils/log')(module);

export const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE';

export const fetchUser = (id) => {
  l();

  return {
    type: FETCH_USER_REQUEST,
    id,
  };
};

export const fetchUserSuccess = (user) => {
  l();

  return {
    type: FETCH_USER_SUCCESS,
    user,
  };
};

export const fetchUserFailure = (error) => {
  l();

  return {
    type: FETCH_USER_FAILURE,
    error,
  };
};
