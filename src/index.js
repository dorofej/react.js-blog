import React from 'react';
import ReactDOM from 'react-dom';

import App from 'containers/App';
import * as serviceWorker from './serviceWorker';


const rootElem = document.getElementById('root');
ReactDOM.render(<App/>, rootElem);

// Hot Module Replacement API
if (module.hot) {
	module.hot.accept('containers/App', () => {
		const NextApp = require('containers/App').default;
		ReactDOM.render(<NextApp/>, rootElem);
	});
};

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
