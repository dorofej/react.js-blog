import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

import NavBar from '../../components/NavBar';
import AppRouter from './AppRouter';

import { fetchPosts } from '../../store/posts/actions';
import { history } from '../../store';

import './styles.less';

class App extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

  render() {
    return (
      <ConnectedRouter history={history}>
        <div className="container">
          <NavBar className="mb-5"/>
          <AppRouter/>
        </div>
      </ConnectedRouter>
    );
  }
};

export default connect(null, { fetchPosts })(App);
