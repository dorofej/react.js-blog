import { all } from 'redux-saga/effects';

import posts from './posts/sagas';
import comments from './comments/sagas';
import user from './user/sagas';

export default function* rootSaga() {
  yield all([
    posts(),
    comments(),
    user(),
  ]);
};
