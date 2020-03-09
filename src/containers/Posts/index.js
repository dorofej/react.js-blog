import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createFilter } from 'react-search-input';

import Spinner from '../../components/Spinner';

const KEYS_TO_FILTERS = ['title', 'body'];

class Posts extends Component {
  constructor(props) {
    super(props);

    this.handleSearch = this.handleSearch.bind(this);

    this.state = {
      searchTerm: '',
    };
  }

  handleSearch(event) {
    this.setState({ searchTerm: event.target.value });
  }

  getFilteredPosts() {
    return this.props.posts
      .filter(createFilter(
        this.state.searchTerm,
        KEYS_TO_FILTERS
      ));
  }

  renderSearchBox() {
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
