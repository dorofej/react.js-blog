/* eslint-disable import/first */
const l = require('utils/log')(module);

import React from 'react';

import './styles.less';


const About = (props) => {
	l();

	return (
		<div className="about">
			<h3>Short Description</h3>
			<p>
				It's a mini-blog with a list of articles where you can
				click on the article and see it separately. From above
				on the page of the list of articles you can use an input with
				search by titles and text.
			</p>
			<p>
				The post page contains the following:
				information about the user who created this article and
				list of comments on this article.
			</p>

			<div>
				<h3>Technology Stack</h3>
				<ul>
					<li>React;</li>
					<li>Redux-Saga;</li>
					<li>React Router;</li>
					<li>Webpack.</li>
				</ul>
			</div>

			<p>
				In this blog following features are implemented:
				<ul>
					<li>
						code splitting (loading the module file only when we go to the page where it is used);
					</li>
					<li>
						ability to add your own comments that will be stored in localStorage and will be saved after the page is reloaded.
					</li>
				</ul>
			</p>

			<h4>Notes</h4>
			<p>
				The <a href="https://jsonplaceholder.typicode.com">https://jsonplaceholder.typicode.com</a>
				{' '}is used as mock server.
			</p>
			<p>
				The source code lives <a href="https://github.com/dorofej/react.js-blog">here</a>.
			</p>
		</div>
	);
};


export default About;
