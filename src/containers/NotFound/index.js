/* eslint-disable import/first */
const l = require('utils/log')(module);

import React from 'react';

import './styles.css';


const NotFound = (props) => {
	l();

	return (
		<div id="not-found">
			<div className="not-found">
				<div className="not-found-404">
					<h3>Oops! Page not found</h3>
					<h1><span>4</span><span>0</span><span>4</span></h1>
				</div>
				<h2>We are sorry, but the page you requested was not found.</h2>
			</div>
		</div>
	);
};


export default NotFound;
