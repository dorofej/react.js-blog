/* eslint-disable import/first */
const l = require('utils/log')(module);

import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';


const Post = ({ posts, match }) => {
	l();

	const postId = Number(match.params.id);

	let post;
	for (let i = 0; i < posts.length; i++) {
		if (posts[i].id === postId) {
			post = posts[i];
			break;
		};
	};

	if (!post) return <div>Post with this id doesn't exist!</div>;

	const { title, body }= post;

	return (
		<div className="app__posts">
			<div className="app__post-container">
				<span className="app__post-title">
					{title}
				</span>
				<div className="app__post-body">
					{body}
				</div>
			</div>
		</div>
	);
};


const state2Props = ({ Posts }) => ({
	posts: Posts.posts,
	loading: Posts.loading,
	error: Posts.error,
});

export default connect(state2Props, null)(withRouter(Post));
