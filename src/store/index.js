/* eslint-disable import/first */
const l = require('utils/log')(module);

import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';

import reducers from './reducers';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

if (process.env.NODE_ENV === 'development') {
	l('DEVELOPMENT MODE');
	middlewares.push(logger);
};

const rootReducer = combineReducers({
	...reducers,
});

const store = createStore(
	rootReducer,
	compose(applyMiddleware(...middlewares)),
);
sagaMiddleware.run(rootSaga);

export { store };
