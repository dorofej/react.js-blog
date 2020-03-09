/* eslint-disable import/first */
const l = require('../../utils/log')(module);

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createFilter } from 'react-search-input';

import Spinner from '../../components/Spinner';

const KEYS_TO_FILTERS = ['title', 'body'];

class Posts extends Component {
  constructor(props) {
    l();

    super(props);

    this.handleSearch = this.handleSearch.bind(this);

    this.state = {
      searchTerm: '',
    };
  }

  handleSearch(event) {
    l();

    this.setState({ searchTerm: event.target.value });
  }

  getFilteredPosts() {
    l();

    return this.props.posts
      .filter(createFilter(
        this.state.searchTerm,
        KEYS_TO_FILTERS
      ));
  }

  renderSearchBox() {
    l();

    return (
      <div className="my-5">
        <input
          className="form-control"
          type="text"
          value={this.state.searchTerm}
          placeholder="Find post"
          disabled={this.props.loading}
          onChange={this.handleSearch}
        />
      </div>
    );
  }

  renderPosts() {
    l();

    if (this.props.loading) {
      return <Spinner/>;
    }

    const posts = this.getFilteredPosts();

    return (
      <div className="row">
        {posts.map(({ title, body, id }) => (
          <div key={id} className="col-md-6 mb-4">
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
    l();

    return (
      <>
        {this.renderSearchBox()}
        {this.renderPosts()}
      </>
    );
  }
};

const mapStateToProps = ({ Posts }) => ({
  posts: Posts.posts,
  loading: Posts.loading,
  error: Posts.error,
});

export default connect(mapStateToProps)(Posts);
