/* eslint-disable import/first */
const l = require('utils/log')(module);

import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import './styles.less';


const shortStrLen = 110;

const Posts = ({ posts }) => {
	l();

	return (
		<div className="app__posts">
			{
				posts.map(({ title, body, id }) => (
					<div className="app__post-container">
						<span className="app__post-title">
							{title}
						</span>
						<div className="app__post-body">
							{ body.length < shortStrLen + 5 ? body : body.slice(0, shortStrLen) + '...'}
						</div>
						<Link
							to={`/posts/${id}`}
							className="app__post-read-button"
						>
							READ
						</Link>
					</div>
				))
			}
		</div>
	);
};

const state2Props = ({ Posts }) => ({
	posts: Posts.posts,
	loading: Posts.loading,
	error: Posts.error,
});

export default connect(state2Props, null)(Posts);
