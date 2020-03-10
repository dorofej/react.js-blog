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
          <NavBar className="mb-5"/>
          <AppRouter/>
        </div>
      </ConnectedRouter>
    );
  }
};

export default App;
