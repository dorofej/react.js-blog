/* eslint-disable import/first */
const l = require('utils/log')(module);

import React from 'react';
import './styles.less';


export default function NavBar(props) {
	l();

	return (
		<header className="header">
			<nav className="header__nav">
				<ul className="header__nav-container">
					<li className="header__nav-item">
						<a className="header__nav-link" href="/home">Home</a>
					</li>
					<li className="header__nav-item">
						<a className="header__nav-link" href="/about">About</a>
					</li>
				</ul>
			</nav>
		</header>
	);
};
