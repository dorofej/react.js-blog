import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Subscription, BehaviorSubject } from 'rxjs';
import { switchMap, catchError, tap, debounceTime, delay } from 'rxjs/operators';

import Spinner from '../../components/Spinner';
import Error from '../../components/Error';
import callApi from '../../libs/callApi';

class Posts extends Component {
  state = {
    posts: [],
    searching: true,
    searchTerm: '',
    error: null,
  };

  subscription$ = new Subscription();
  subject$ = new BehaviorSubject('').pipe(
    tap((searchTerm) => this.setState({ searchTerm })),
    debounceTime(250),
    switchMap((q) => {
      this.setState({ searching: true });
      return callApi(!q ? `posts` : `posts?q=${q}`);
    }),
    delay(250),
    tap((posts) => {
      this.setState({ posts, searching: false });
    }),
    catchError((error) => {
      this.setState({ error, searching: false });
    })
  );

  componentDidMount() {
    this.subscription$ = this.subject$.subscribe();
  }

  componentWillUnmount() {
    this.subscription$.unsubscribe();
  }

  handleSearch = (event) => {
    this.subject$.next(event.target.value);
  };

  renderSearchInput() {
    return (
      <input
        autoFocus
        className="form-control"
        type="text"
        value={this.state.searchTerm}
        placeholder="Find post"
        onChange={this.handleSearch}
      />
    );
  }

  renderPosts() {
    if (this.state.searching) {
      return <Spinner/>;
    }

    if (this.state.error) {
      return <Error className="mt-4" error={this.state.error}/>;
    }

    const { posts } = this.state;

    if (posts.length === 0) {
      return <h4>Posts not found</h4>;
    }

    return (
      <div className="row">
        {posts.map(({ title, body, id }) => (
          <div key={id} className="col-md-6 mt-4">
            <div className="card h-100">
              <div className="card-header">
                <h5 className="card-title mb-0 text-truncate">{title}</h5>
              </div>
              <div className="card-body">
                <div className="card-text">{body}</div>
              </div>
              <div className="card-footer">
                <Link className="btn btn-primary" to={`/posts/${id}`}>
                  Read
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  render() {
    return (
      <>
        {this.renderSearchInput()}
        {this.renderPosts()}
      </>
    );
  }
};

export default Posts;
