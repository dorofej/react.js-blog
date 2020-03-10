import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Subject, Subscription, BehaviorSubject } from 'rxjs';
import { switchMap, catchError, tap, debounceTime, delay } from 'rxjs/operators';

import Spinner from '../../components/Spinner';
import Error from '../../components/Error';
import Input from '../../components/Input';
import Pagination from '../../components/Pagination';
import callApi from '../../libs/callApi';
import serializeUrlParams from '../../libs/serializeUrlParams';

class PostsList extends Component {
  state = {
    posts: [],
    searching: true,
    searchTerm: '',
    page: 1,
    lastPage: false,
    error: null,
  };

  pageLimit = 10;

  searchInputSubscription$ = new Subscription();
  searchInputSubject$ = new Subject().pipe(
    tap((searchTerm) => this.setState({ searchTerm, page: 1 })),
    debounceTime(250),
    tap((searchTerm) => this.searchingSubject$.next(searchTerm))
  );

  paginationSubscription$ = new Subscription();
  paginationSubject$ = new Subject().pipe(
    tap((page) => {
      this.setState(
        { page },
        () => this.searchingSubject$.next(this.state.searchTerm)
      );
    })
  );

  searchingSubscription$ = new Subscription();
  searchingSubject$ = new BehaviorSubject('').pipe(
    tap(() => this.setState({ searching: true })),
    switchMap((q) => {
      const query = { q, _limit: this.pageLimit, _page: this.state.page };
      const path = `posts?${serializeUrlParams(query)}`;
      return callApi(path);
    }),
    delay(250),
    tap((posts) => {
      const lastPage = posts.length < this.pageLimit;
      this.setState({ posts, lastPage, searching: false });
    }),
    catchError((error) => {
      this.setState({ error, searching: false });
    })
  );

  componentDidMount() {
    this.searchInputSubscription$ = this.searchInputSubject$.subscribe();
    this.paginationSubscription$ = this.paginationSubject$.subscribe();
    this.searchingSubscription$ = this.searchingSubject$.subscribe();
  }

  componentWillUnmount() {
    this.searchInputSubscription$.unsubscribe();
    this.paginationSubscription$.unsubscribe();
    this.searchingSubscription$.unsubscribe();
  }

  renderSearchInput() {
    return (
      <Input
        autoFocus
        showClear
        type="text"
        value={this.state.searchTerm}
        placeholder="Find post"
        onChange={(e) => this.searchInputSubject$.next(e.target.value)}
        onClear={(e) => this.state.searchTerm && this.searchInputSubject$.next('')}
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
      return <h4 className="mt-4 mb-0">Posts not found</h4>;
    }

    return (
      <div>
        <div className="row">
          {posts.map(this.renderPostCard)}
        </div>
        <Pagination
          className="mt-4"
          page={this.state.page}
          lastPage={this.state.lastPage}
          onPaginate={(page) => this.paginationSubject$.next(page)}
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

export default PostsList;
