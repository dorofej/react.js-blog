/* eslint-disable import/first */
const l = require('../../utils/log')(module);

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import SearchInput, { createFilter } from 'react-search-input';

import Spinner from '../../components/Spinner';

import './styles.less';

const shortStrLen = 110;
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

  handleSearch(searchTerm) {
    l();

    this.setState({ searchTerm });
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
      <div className="app__posts-search-box">
        <SearchInput
          value={this.state.searchTerm}
          className="search-box__input"
          onChange={this.handleSearch}
        />
      </div>
    );
  }

  render() {
    l();

    const posts = this.getFilteredPosts();
    const { loading } = this.props;

    return (
      <div className="app__posts">
        {this.renderSearchBox()}
        {
          loading
            ?
          <Spinner/>
            :
          posts.map(({ title, body, id }) => (
            <div className="app__post-container">
              <span className="app__post-title">
                {title}
              </span>
              <div className="app__post-body">
                { body.length < shortStrLen + 5 ? body : body.slice(0, shortStrLen) + '...'}
              </div>
              <Link
                to={`/posts/${id}`}
                className="app__post-read-button"
              >
                READ
              </Link>
            </div>
          ))
        }
      </div>
    );
  }
};

const mapStateToProps = ({ Posts }) => ({
  posts: Posts.posts,
  loading: Posts.loading,
  error: Posts.error,
});

export default connect(mapStateToProps)(Posts);
