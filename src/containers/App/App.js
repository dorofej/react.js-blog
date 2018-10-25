/* eslint-disable import/first */
const l = require('utils/log')(module);

import React, { Component } from 'react';
import { connect } from 'react-redux';

import NavBar from 'components/NavBar';

import actions from 'store/posts/actions';

import './styles.less';


const { fetchPosts } = actions;

class App extends Component {
	constructor(props) {
		l();

		super(props);
	}

	componentDidMount() {
		l();

		this.props.fetchPosts();
	}

	renderPosts() {
		l();

		const { posts } = this.props;
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


const state2Props = ({ Posts }) => ({
	posts: Posts.posts,
	loading: Posts.loading,
	error: Posts.error,
});

const dispatch2Props = { fetchPosts };

export default connect(state2Props, dispatch2Props)(App);
