/* eslint-disable import/first */
const l = require('utils/log')(module);

import React, { Component } from 'react';
import './styles.less';

class App extends Component {
	render() {
		l();

		return (
			<div className="app">
				React.js Blog
			</div>
		);
	}
};

export default App;
