/* eslint-disable import/first */
const l = require('utils/log')(module);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

import NavBar from 'components/NavBar';
import AppRouter from './AppRouter';

import actions from 'store/posts/actions';
import { history } from 'store';

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

	render() {
		l();

		return (
			<ConnectedRouter history={history}>
				<div className="app">
					<NavBar/>
					<AppRouter/>
				</div>
			</ConnectedRouter>
		);
	}
};


const dispatch2Props = { fetchPosts };

export default connect(null, dispatch2Props)(App);
