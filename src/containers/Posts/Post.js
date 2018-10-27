/* eslint-disable import/first */
const l = require('utils/log')(module);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Spinner from 'components/Spinner';

import storage from 'libs/storage';

import commentsActions from 'store/comments/actions';
import userActions from 'store/user/actions';

import './styles.less';

const { fetchComments, addComment } = commentsActions;
const { fetchUser } = userActions;


class Post extends Component {
	constructor(props) {
		l();

		super(props);

		this.handleCommentInputChange = this.handleCommentInputChange.bind(this);
		this.addComment = this.addComment.bind(this);

		this.state = {
			comment: storage('comment'),
		};
	}

	componentDidMount() {
		l();

		const { fetchComments, match } = this.props;
		fetchComments(match.params.id);
		this.loadUser();
	}

	handleCommentInputChange({ target }) {
		l();

		const { value } = target;
		this.setState({ comment: value });
		storage('comment', value);
	}

	addComment() {
		l();

		this.props.addComment({
			postId: 501,
			title: 'Title',
			body: this.state.comment,
			userId: 1,
		});

		this.setState({ comment: '' });
		storage('comment', '');
	}

	loadUser() {
		l();

		const { fetchUser } = this.props;
		const intervalId = setInterval(() => {
			l('SET_INTERVAL');
			const post = this.getPostObj();
			if (post) {
				fetchUser(post.userId);
				clearInterval(intervalId);
			};
		}, 500);
	}

	getPostObj() {
		l();

		const { posts, match } = this.props;
		const postId = Number(match.params.id);

		for (let i = 0; i < posts.length; i++) {
			if (posts[i].id === postId) return posts[i];
		};
	}

	renderUserInfo() {
		l();

		const { user, isUserLoaded } = this.props;

		if (isUserLoaded) return (
			<div className="post__user-table-wrapper">
				<Spinner/>
			</div>
		);

		if (!user) return null;

		const { address } = user;
		return (
			<div className="post__user-table-wrapper">
				<table className="post__user-table">
					<thead>
						<tr className="post__user-table-row--header">
							<th colSpan="2">About Author</th>
						</tr>
					</thead>
					<tbody>
						<tr className="post__user-table-row">
							<td>Full Name</td>
							<td>{user.name}</td>
						</tr>
						<tr className="post__user-table-row">
							<td>Email</td>
							<td><a href={`mailto:${user.email}`}>{user.email}</a></td>
						</tr>
						<tr className="post__user-table-row">
							<td>Phone</td>
							<td>{user.phone}</td>
						</tr>
						<tr className="post__user-table-row">
							<td>Username</td>
							<td>{user.username}</td>
						</tr>
						<tr className="post__user-table-row">
							<td>Website</td>
							<td><a href={`https://${user.website}`}>{user.website}</a></td>
						</tr>
						<tr className="post__user-table-row">
							<td>Company</td>
							<td>{user.company.name}</td>
						</tr>
						<tr className="post__user-table-row">
							<td>Location</td>
							<td>{address.city}, {address.street}, {address.suite}</td>
						</tr>
					</tbody>
				</table>
			</div>
		);
	}

	renderComments() {
		l();

		const { comments, areCommentsLoaded } = this.props;
		const { comment } = this.state;

		return (
			<div className="post__comments">
				<span className="post__comments-title">Comments</span>
				{
					areCommentsLoaded
						?
					<Spinner/>
						:
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
				<div className="post__add-comment-container">
					<textarea
						value={comment}
						className="post__add-comment-input"
						type="text"
						placeholder="Write Comment Here"
						rows="7"
						name="post"
						onChange={this.handleCommentInputChange}
					/>
					<span
						className="post__add-comment-button"
						onClick={this.addComment}
					>
						ADD COMMENT
					</span>
				</div>
			</div>
		);
	}

	render() {
		l();

		const { arePostsLoaded } = this.props;

		if (arePostsLoaded) return (
			<div style={{ marginTop: 40 }}>
				<Spinner/>
			</div>
		);

		const post = this.getPostObj();
		if (!post) return (
			<div
				className="post__not-found"
			>
				Post with this id doesn't exist!
			</div>
		);

		const { title, body }= post;

		return (
			<div className="app__posts">
				{this.renderUserInfo()}
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


const state2Props = ({ Posts, Comments, User }) => ({
	posts: Posts.posts,
	arePostsLoaded: Posts.loading,
	postsError: Posts.error,
	comments: Comments.comments,
	areCommentsLoaded: Comments.loading,
	commentsError: Comments.error,
	user: User.user,
	isUserLoaded: User.loading,
	userError: User.error,
});

const dispatch2Props = { fetchComments, addComment, fetchUser };

export default connect(state2Props, dispatch2Props)(withRouter(Post));
