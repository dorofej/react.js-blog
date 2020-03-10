import React, { Component } from 'react';
import { ConnectedRouter } from 'react-router-redux';

import NavBar from '../../components/NavBar';
import AppRouter from './AppRouter';

import { history } from '../../store';

import './styles.less';

class App extends Component {
  render() {
    return (
      <ConnectedRouter history={history}>
        <div className="container pb-3">
          {/*
            FIXME: below div is little hack to work around input outline
            appearance behind navbar.
            Also body background-color should be set
          */}
          <div
            style={{ backgroundColor: 'var(--white)' }}
            className="row mb-5 sticky-top"
          >
            <div className="col-12">
              <NavBar/>
            </div>
          </div>
          <AppRouter/>
        </div>
      </ConnectedRouter>
    );
  }
};

export default App;
