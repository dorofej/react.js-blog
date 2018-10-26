/* eslint-disable import/first */
const l = require('utils/log')(module);

import React from 'react';
import { Link } from 'react-router-dom';

import './styles.less';


export default function NavBar(props) {
	l();

	return (
		<header className="header">
			<nav className="header__nav">
				<ul className="header__nav-container">
					<li className="header__nav-item">
						<Link
							to="/home"
							className="header__nav-link"
						>
							Home
						</Link>
					</li>
					<li className="header__nav-item">
						<Link
							to="/about"
							className="header__nav-link"
						>
							About
						</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
};
