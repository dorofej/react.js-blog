/* eslint-disable import/first */
const l = require('../../utils/log')(module);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

import NavBar from '../../components/NavBar';
import AppRouter from './AppRouter';

import { fetchPosts } from '../../store/posts/actions';
import { history } from '../../store';

import './styles.less';

class App extends Component {
  constructor(props) {
    l();

    super(props);
  }

  componentDidMount() {
    l();

    this.props.fetchPosts();
  }

  render() {
    l();

    return (
      <ConnectedRouter history={history}>
        <div className="app">
          <NavBar/>
          <AppRouter/>
        </div>
      </ConnectedRouter>
    );
  }
};

export default connect(null, { fetchPosts })(App);
