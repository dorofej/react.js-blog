import React, { Component } from 'react';
import { withRouter } from 'react-router';
import SmoothCollapse from 'react-smooth-collapse';
import { Subscription, forkJoin, defer } from 'rxjs';
import { switchMap, catchError, tap } from 'rxjs/operators';

import Spinner from '../../components/Spinner';
import Error from '../../components/Error';
import storage from '../../libs/storage';
import callApi from '../../libs/callApi';

class Post extends Component {
  state = {
    post: null,
    user: null,
    comments: [],
    loading: true,
    comment: storage('comment'),
    userInfoVisible: false,
    error: null,
  };

  subscription$ = new Subscription();
  observable$ = defer(() => callApi(`posts/${this.props.match.params.id}`)).pipe(
    switchMap((post) => {
      this.setState({ post });

      return forkJoin(
        callApi(`users/${post.userId}`),
        callApi(`comments?postId=${post.id}`)
      );
    }),
    tap(([user, comments]) => {
      this.setState({ user, comments, loading: false });
    }),
    catchError((error) => {
      this.setState({ error, loading: false });
    })
  );

  componentDidMount() {
    this.subscription$ = this.observable$.subscribe();
  }

  componentWillUnmount() {
    this.subscription$.unsubscribe();
  }

  handleCommentInputChange = ({ target }) => {
    const { value } = target;
    this.setState({ comment: value });
    storage('comment', value);
  };

  addComment = () => {
    this.setState({ comment: '' });
    storage('comment', '');
  };

  renderPost() {
    const { post } = this.state;

    return (
      <div>
        <h4>{post.title}</h4>
        <div className="mt-2">{post.body}</div>
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
    const { user } = this.state;
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
    const { comments } = this.state;

    return (
      <div>
        <h4>Comments</h4>
        {comments.map(({ id, name, email, body }) => (
          <div key={id} className="card mt-4 border-secondary">
            <div className="card-body">
              <h5 className="card-title">{name}</h5>
              <div className="cart-text">
                {body}
              </div>
              <a className="d-block border-top mt-2 pt-2" href={`mailto:${email}`}>
                {email}
              </a>
            </div>
          </div>
        ))}
      </div>
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
    const { loading, post, error } = this.state;

    if (loading) {
      return <Spinner/>;
    }

    if (error) {
      return <Error error={error}/>;
    }

    if (!post) {
      return (
        <h4>
          Post doesn't exist
        </h4>
      );
    }

    return (
      <>
        {this.renderPost()}
        <div className="mt-5">
          {this.renderUserInfo()}
        </div>
        <div className="mt-5">
          {this.renderCommentInput()}
        </div>
        <div className="mt-5">
          {this.renderComments()}
        </div>
      </>
    );
  }
};

export default withRouter(Post);
