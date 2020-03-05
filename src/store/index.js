/* eslint-disable import/first */
const l = require('../utils/log')(module);

import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import createHistory from 'history/createBrowserHistory';
import { routerReducer, routerMiddleware } from 'react-router-redux';

import reducers from './reducers';
import rootSaga from './sagas';

export const history = createHistory();

const routeMiddleware = routerMiddleware(history);
const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware, routeMiddleware];

if (process.env.NODE_ENV === 'development') {
  l('DEVELOPMENT MODE');
  middlewares.push(logger);
};

const rootReducer = combineReducers({
  ...reducers,
  router: routerReducer,
});

export const store = createStore(
  rootReducer,
  compose(applyMiddleware(...middlewares)),
);

sagaMiddleware.run(rootSaga);
