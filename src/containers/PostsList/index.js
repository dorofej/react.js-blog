import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { Subscription, BehaviorSubject } from 'rxjs';
import { switchMap, catchError, tap, debounceTime, delay } from 'rxjs/operators';

import Spinner from '../../components/Spinner';
import Error from '../../components/Error';
import Input from '../../components/Input';
import Pagination from '../../components/Pagination';
import callApi from '../../libs/callApi';
import URLParams from '../../libs/URLParams';
import URLLocation from '../../libs/URLLocation';

class PostsList extends Component {
  state = {
    posts: [],
    searching: true,
    error: null,
  };

  pageLimit = 10;

  searchingSubscription$ = new Subscription();
  searchingSubject$ = new BehaviorSubject().pipe(
    debounceTime(250),
    tap(() => this.setState({ searching: true })),
    switchMap(() => {
      const query = {
        q: URLLocation.get('q'),
        _limit: this.pageLimit,
        _page: +URLLocation.get('page') || 1,
      };

      const path = `posts?${URLParams.serialize(query)}`;
      return callApi(path);
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
    this.searchingSubscription$ = this.searchingSubject$.subscribe();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.search !== this.props.location.search) {
      this.searchingSubject$.next();
    };
  }

  componentWillUnmount() {
    this.searchingSubscription$.unsubscribe();
  }

  renderSearchInput() {
    return (
      <Input
        style={{ top: 60 }}
        className="sticky-top shadow shadow-sm"
        autoFocus
        showClear
        type="text"
        value={URLLocation.get('q') || ''}
        placeholder="Find post"
        onChange={(e) => URLLocation.push({ q: e.target.value, page: null })}
        onClear={(e) => URLLocation.push({ q: null, page: null })}
      />
    );
  }

  renderPostCard({ title, body, id }) {
    return (
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
      return (
        <div>
          <h4 className="mt-4 mb-0">Posts not found</h4>
          <button
            className="btn btn-primary mt-3"
            onClick={() => URLLocation.push({ page: null })}
          >
            Reset pagination
          </button>
        </div>
      );
    }

    return (
      <div>
        <div className="row">
          {posts.map(this.renderPostCard)}
        </div>
        <Pagination
          className="mt-4 mb-0"
          page={+URLLocation.get('page') || 1}
          lastPage={this.state.posts.length < this.pageLimit}
          onPaginate={(page) => URLLocation.push({ page })}
        />
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

export default withRouter(PostsList);
