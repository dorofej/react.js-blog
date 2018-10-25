/* eslint-disable import/first */
const l = require('utils/log')(module);

import React, { Component } from 'react';

import NavBar from 'components/NavBar';

import callApi from 'libs/callApi';

import './styles.less';


class App extends Component {
	constructor(props) {
		l();

		super(props);

		this.state = {
			posts: [],
		};
	}

	componentDidMount() {
		l();

		callApi('posts')
			.then((posts) => this.setState({ posts }))
			.catch((error) => this.setState({ error: error.message || error }));
	}

	renderPosts() {
		l();

		const { posts } = this.state;
		const shortStrLen = 110;

		return (
			<div className="app__posts">
				{
					posts.map(({ title, body }) => (
						<div className="app__post-container">
							<span className="app__post-title">
								{title}
							</span>
							<div className="app__post-body">
								{ body.length < shortStrLen + 5 ? body : body.slice(0, shortStrLen) + '...'}
							</div>
							<div className="app__post-read-button">
								READ
							</div>
						</div>
					))
				}
			</div>
		);
	}

	render() {
		l();

		return (
			<div className="app">
				<NavBar/>
				{this.renderPosts()}
			</div>
		);
	}
};

export default App;
