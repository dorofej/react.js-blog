/* eslint-disable import/first */
const l = require('utils/log')(module);

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
	render() {
		l();

		return (
			<div className="App">
				React.js Blog
			</div>
		);
	}
};

export default App;
