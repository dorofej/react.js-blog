import { all } from 'redux-saga/effects';

import profile from './profile/sagas';

export default function* rootSaga() {
  yield all([
    profile(),
  ]);
};
