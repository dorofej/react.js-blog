/* eslint-disable import/first */
const l = require('utils/log')(module);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import actions from 'store/comments/actions';

const { fetchComments } = actions;


class Post extends Component {
	componentDidMount() {
		l();

		const { fetchComments, match } = this.props;
		fetchComments(match.params.id);
	}

	getPostObj() {
		l();

		const { posts, match } = this.props;
		const postId = Number(match.params.id);

		for (let i = 0; i < posts.length; i++) {
			if (posts[i].id === postId) return posts[i];
		};
	}

	renderComments() {
		l();

		const { comments } = this.props;

		return (
			<div className="post__comments">
				<span className="post__comments-title">Comments</span>
				{
					comments.map(({ id, name, email, body }) => (
						<div
							key={id}
							className="post__comment-container"
						>
							<div
								className="post__comment-body"
							>
								{body}
							</div>
							<a
								href={`mailto:${email}`}
								className="post__comment-email"
							>
								{email}
							</a>
						</div>
					))
				}
			</div>
		);
	}

	render() {
		l();

		const post = this.getPostObj();
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
				{this.renderComments()}
			</div>
		);
	}
};


const state2Props = ({ Posts, Comments }) => ({
	posts: Posts.posts,
	arePostsLoaded: Posts.loading,
	postsError: Posts.error,
	comments: Comments.comments,
	areCommentsLoaded: Comments.loading,
	commentsError: Comments.error,
});

const dispatch2Props = { fetchComments };

export default connect(state2Props, dispatch2Props)(withRouter(Post));
