/* eslint-disable import/first */
const l = require('utils/log')(module);

import React, { Component } from 'react';
import { connect } from 'react-redux';

import './styles.less';


class Home extends Component {
	constructor(props) {
		l();

		super(props);

		this.handleInputChange = this.handleInputChange.bind(this);

		this.state = {
			value: '',
		};
	}

	handleInputChange({ target }) {
		l();

		this.setState({ value: target.value });
	}

	render() {
		l();

		const { value } = this.state;

		return (
			<div className="app__home">
				<div className="home__create-article-container">
					<textarea
						value={value}
						className="home__create-article-text"
						type="text"
						placeholder="Your Post Text"
						cols="80"
						rows="20"
						name="post"
						onChange={this.handleInputChange}
					/>
					<span
						className="home__create-article-button"
					>
						SEND POST
					</span>
				</div>
			</div>
		);
	}
};


export default connect()(Home);