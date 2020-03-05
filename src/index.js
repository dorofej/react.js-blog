import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './containers/App';
import { store } from './store';
import * as serviceWorker from './serviceWorker';


const rootElem = document.getElementById('root');
const renderApp = (App) => {
  ReactDOM.render(
    <Provider store={store}>
      <App/>
    </Provider>,
    rootElem
  );
};

renderApp(App);

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./containers/App', () => {
    renderApp(require('./containers/App').default);
  });
};

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
