import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import SmoothCollapse from 'react-smooth-collapse';

import Spinner from '../../components/Spinner';
import storage from '../../libs/storage';
import { fetchComments, addComment } from '../../store/comments/actions';
import { fetchUser } from '../../store/user/actions';

class Post extends Component {
  constructor(props) {
    super(props);

    this.handleCommentInputChange = this.handleCommentInputChange.bind(this);
    this.addComment = this.addComment.bind(this);

    this.state = {
      comment: storage('comment'),
      userInfoVisible: false,
    };
  }

  componentDidMount() {
    const { fetchComments, match } = this.props;
    fetchComments(match.params.id);
    this.loadUser();
  }

  handleCommentInputChange({ target }) {
    const { value } = target;
    this.setState({ comment: value });
    storage('comment', value);
  }

  addComment() {
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
    const { fetchUser } = this.props;
    const intervalId = setInterval(() => {
      const post = this.getPostObj();
      if (post) {
        fetchUser(post.userId);
        clearInterval(intervalId);
      };
    }, 500);
  }

  getPostObj() {
    const { posts, match } = this.props;
    const postId = Number(match.params.id);

    for (let i = 0; i < posts.length; i++) {
      if (posts[i].id === postId) return posts[i];
    };
  }

  renderPost() {
    const post = this.getPostObj();
    if (!post) {
      return (
        <div>
          Post with this id doesn't exist!
        </div>
      );
    }

    const { title, body } = post;

    return (
      <div>
        <h4>{title}</h4>
        <div className="mt-2">{body}</div>
      </div>
    );
  }

  renderUserInfoRow(col1, col2) {
    return (
      <div className="list-group-item">
        <div className="row">
          <div className="col-sm-4 mb-1 mb-sm-0 font-weight-bold">{col1}</div>
          <div className="col-sm-8">{col2}</div>
        </div>
      </div>
    );
  }

  renderUserInfo() {
    const { user, isUserLoaded } = this.props;

    if (isUserLoaded) {
      return <Spinner/>;
    }

    if (!user) return null;

    const { address } = user;

    return (
      <div>
        <button
          className="btn btn-primary"
          type="button"
          onClick={() => this.setState(({ userInfoVisible }) => ({ userInfoVisible: !userInfoVisible }))}
        >
          About author
        </button>
        <SmoothCollapse expanded={this.state.userInfoVisible}>
          <div className="list-group mt-4">
            {this.renderUserInfoRow('Full Name', user.name)}
            {this.renderUserInfoRow('Email', user.email)}
            {this.renderUserInfoRow('Phone', user.phone)}
            {this.renderUserInfoRow('Username', user.username)}
            {this.renderUserInfoRow('Website', user.website)}
            {this.renderUserInfoRow('Company', user.company.name)}
            {this.renderUserInfoRow('Location', `${address.city}, ${address.street}, ${address.suite}`)}
          </div>
        </SmoothCollapse>
      </div>
    );
  }

  renderComments() {
    const { comments, areCommentsLoaded } = this.props;

    return (
      <>
        <h4>Comments</h4>
        {
          areCommentsLoaded
            ?
          <Spinner/>
            :
          comments.map(({ id, name, email, body }) => (
            <div key={id} className="card mt-4 border-secondary">
              <div className="card-body">
                <h5 class="card-title">{name}</h5>
                <div className="cart-text">
                  {body}
                </div>
                <a className="d-block border-top mt-2 pt-2" href={`mailto:${email}`}>
                  {email}
                </a>
              </div>
            </div>
          ))
        }
      </>
    );
  }

  renderCommentInput() {
    return (
      <div className="form-group">
        <h4>Your comment</h4>
        <textarea
          className="form-control"
          rows="3"
          onChange={this.handleCommentInputChange}
        />
        <button className="btn btn-primary mt-3" onClick={this.addComment}>Add</button>
      </div>
    );
  }

  render() {
    const { arePostsLoaded } = this.props;

    if (arePostsLoaded) {
      return (
        <div style={{ marginTop: 40 }}>
          <Spinner/>
        </div>
      );
    }

    return (
      <>
        {this.renderPost()}
        <div className="mt-5">
          {this.renderUserInfo()}
        </div>
        <div className="mt-5">
          {this.renderComments()}
        </div>
        <div className="mt-5">
          {this.renderCommentInput()}
        </div>
      </>
    );
  }
};

const mapStateToProps = ({ Posts, Comments, User }) => ({
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

export default connect(
  mapStateToProps,
  { fetchComments, addComment, fetchUser }
)(withRouter(Post));
